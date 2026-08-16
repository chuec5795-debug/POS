document.addEventListener("DOMContentLoaded", function () {
  const mainContent = document.getElementById("main-content");
  const navLinks = document.querySelectorAll(".nav-link");

  const isLoginIn = localStorage.getItem("isLoggedIn");
  if(isLoginIn !== "true"){
    window.location.href = "login.html";
    return;
  }

  const currentUserEmain = localStorage.getItem("currentUser")|| "user@gmail.com";
  const currentUserRole = localStorage.getItem("userRole") || "guest";

  const currentUser = {
    name : currentUserEmain.split('@')[0],
    role : currentUserRole
  };

  const userNameEle = document.getElementById("userName");
  const userRoleEle = document.getElementById("userRole");
  if(userNameEle) userNameEle.innerHTML = currentUser.name;
  if(userRoleEle) userRoleEle.innerHTML  = currentUser.role;

function filterMenuByRole(userRole) {
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach((item) => {
      const allowedRoles = item.getAttribute("data-roles");

      if (allowedRoles) {
        const rolesArray = allowedRoles.split(",").map((r) => r.trim());
        if (!rolesArray.includes(userRole)) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      }
    });
  }
  filterMenuByRole(currentUser.role);
  function loadPage(pageUrl) {
    fetch(pageUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Page not found");
        return response.text();
      })
      .then((htmlData) => {
        mainContent.innerHTML = htmlData;
      })
      .catch((error) => {
        mainContent.innerHTML = "<h2>404 - Content load</h2>";
      });
  }
  
if(currentUser.role === "sales"){
    loadPage("sales.html"); // Sales ဝင်ရင် Sales မျက်နှာပြင်ကို ပထမဆုံးပြမည်
  }else{
    loadPage("dashboard-home.html"); // Admin/Manager ဝင်ရင် Home မျက်နှာပြင်ကို ပြမည်
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelectorAll(".nav-item").forEach((item) => {
        item.classList.remove("active");
      });
      this.parentElement.classList.add("active");
      const targetPage = this.getAttribute("data-page");
      if (targetPage) {
        loadPage(targetPage);
      }
    });
  });
});