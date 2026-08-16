const users = [
    { email: "kyawkhaing@gmail.com", password: "12345", role: "admin" },
    { email: "wailin@gmail.com", password: "12345", role: "manager" },
    { email: "chue@gmail.com", password: "12345", role: "sales" }
];

document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");
    if (isLoggedIn === "true" && window.location.pathname.includes("login.html")) {
        redirectToRolePage(userRole);
    }
});

const loginForm = document.getElementById("loginform");

if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault(); 

        const inputEmail = document.getElementById("email").value;
        const inputPass = document.getElementById("password").value;
        const selectedRoleElement = document.querySelector('input[name="role"]:checked');
        const inputRole = selectedRoleElement ? selectedRoleElement.value : null;
        const user = users.find(u => u.email === inputEmail && u.password === inputPass && u.role === inputRole);

        if (user) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", user.email);
            localStorage.setItem("userRole", user.role);

            alert("Login အောင်မြင်ပါသည်! Welcome " + user.role.toUpperCase());

            redirectToRolePage(user.role);
        } else {
            alert("Email၊ Password သို့မဟုတ် Role မှားယွင်းနေပါသည်။");
        }
    });
}
function redirectToRolePage(role) {
    if (role === "admin" || role === "manager") {
        window.location.href = "dashboard.html"; 
    } else if (role === "sales") {
        window.location.href = "dashboard.html"; 
    }
}