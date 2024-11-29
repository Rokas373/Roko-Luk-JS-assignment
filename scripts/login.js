document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();


    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");


    errorMessage.textContent = "";


    const users = JSON.parse(localStorage.getItem("users")) || [];


    const user = users.find(
        (user) => user.email === email && user.password === password
    );

    if (user) {
        localStorage.setItem("loggedInUserEmail", email);

        window.location.href = "index.html";
    } else {

        errorMessage.className = "alert alert-danger text-danger mt-3";
        errorMessage.textContent = "Invalid email or password.";
    }
});