document.addEventListener("DOMContentLoaded", function () {
  const mainContent = document.getElementById("main-content");
  const navLinks = document.querySelectorAll(".nav-link");

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
        mainContent.innerHTML = "<h2>404 - Content load လို့မရပါ!</h2>";
      });
  }
  loadPage("dashboard-home.html");

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

    document.getElementById("logoutbtn").addEventListener("click", function() {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userRole");

        window.location.href = "login.html";
    });