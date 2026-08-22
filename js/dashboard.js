document.addEventListener("DOMContentLoaded", function () {
  const mainContent = document.getElementById("main-content");
  const navLinks = document.querySelectorAll(".nav-link");

  const isLoginIn = localStorage.getItem("isLoggedIn");
  if (isLoginIn !== "true") {
    window.location.href = "login.html";
    return;
  }

  const currentUserEmain = localStorage.getItem("currentUser") || "user@gmail.com";
  const currentUserRole = localStorage.getItem("userRole") || "guest";

  const currentUser = {
    name: currentUserEmain.split('@')[0],
    role: currentUserRole
  };

  const userNameEle = document.getElementById("userName");
  const userRoleEle = document.getElementById("userRole");
  if (userNameEle) userNameEle.innerHTML = currentUser.name;
  if (userRoleEle) userRoleEle.innerHTML = currentUser.role;

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
    if (!pageUrl) return;

    fetch(pageUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Page not found");
        return response.text();
      })
      .then((htmlData) => {
        mainContent.innerHTML = htmlData;

        if (pageUrl === "dashboard-home.html") {
          renderWeeklyChart();
          renderDailyChart();
        }
        if (pageUrl === "accounts.html") {
          initAccountPage()
        }

        if (pageUrl === "sales.html" && typeof initSalePage === "function") {
          initSalePage();
        }
      })
      .catch((error) => {
        mainContent.innerHTML = `<h2 style="padding: 20px; color: red;">404 - ${pageUrl} ကို ရှာမတွေ့ပါ။</h2>`;
      })
  }

  if (currentUser.role === "sales") {
    loadPage("pc.html");
  } else {
    loadPage("dashboard-home.html");
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

document.getElementById("logoutbtn").addEventListener("click", function () {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("userRole");

  window.location.href = "login.html";
});

localStorage.setItem("WeeklySales", JSON.stringify([
  {
    date: "2026-08-17",
    amount: 200
  },
  {
    date: "2026-08-18",
    amount: 300
  }
]));
localStorage.setItem("DailySales", JSON.stringify([
  {
    id: 1,
    time: "9 AM",
    amount: 1000
  },
  {
    id: 2,
    time: "2 PM",
    amount: 2000
  }
]))

let renderDailyChart = () => {
  const dailyData = JSON.parse(localStorage.getItem("DailySales")) || [];
  const ctx = document.getElementById("dailySalesChart");
  if (!ctx) return;
  const labels = dailyData.map(sale => sale.time);
  const amount = dailyData.map(sale => Number(sale.amount) || 0);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Daily Sale $",
        data: amount,
        borderWidth: 2,
        tension: 0.3
      }]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })

}


let weeklyChartInstance = null;
let renderWeeklyChart = () => {
  const ctx = document.getElementById("weeklySalesChart");
  if (!ctx) return;
  const sales = JSON.parse(localStorage.getItem("WeeklySales")) || [];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklySales = [0, 0, 0, 0, 0, 0, 0];
  sales.forEach((sale) => {
    const date = new Date(sale.date);
    let day = date.getDay();
    let index = day === 0 ? 6 : day - 1;
    weeklySales[index] += Number(sale.amount) || 0;
  })
  if (weeklyChartInstance) {
    weeklyChartInstance.destroy();
  }
  weeklyChartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Weekly Sales ($)",
        data: weeklySales,
        backgroundColor: "#3182ce",
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

/////////////////Accounts.html///////////////////////////


// 2. Account Page အတွက် Function များ

function initAccountPage() {
  renderUserTable();

  const form = document.getElementById("addUserForm");
  if (form) {
    form.onsubmit = function (e) {
      e.preventDefault();
      const email = document.getElementById("accEmail").value;
      const password = document.getElementById("accPassword").value;
      const role = document.getElementById("accRole").value;

      const users = JSON.parse(localStorage.getItem("systemUsers")) || [];
      users.push({
        email,
        password,
        role
      });
      localStorage.setItem(
        "systemUsers",
        JSON.stringify(users)
      );
      form.reset();
      renderUserTable();
    };
  }
}

function renderUserTable() {
  const tableBody = document.getElementById("userTableBody");
  if (!tableBody) return;


  const users = JSON.parse(localStorage.getItem("systemUsers")) || defaultUsers;
  tableBody.innerHTML = users.map((user, index) => `
    <tr style="border-bottom: 1px solid #edf2f7;">
      <td style="padding: 10px; font-weight: 500;">${user.email}</td>
      <td style="padding: 10px;">
        <span style="background: #e2e8f0; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">
          ${user.role}
        </span>
      </td>
      <td style="padding: 10px; text-align: center;">
        <button onclick="deleteUser(${index})" style="background: #e53e3e; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;">
          Delete
        </button>
      </td>
    </tr>
  `).join("");
}

function deleteUser(index) {
  let users = JSON.parse(localStorage.getItem("systemUsers")) || [];
  users.splice(index, 1);
  localStorage.setItem("systemUsers", JSON.stringify(users));
  renderUserTable();
}