document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();


    const email = document.getElementById("email").value;
    const password1 = document.getElementById("password1").value;
    const password2 = document.getElementById("password2").value;
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const successMessage = document.getElementById("successMessage");


    emailError.textContent = "";
    passwordError.textContent = "";
    successMessage.textContent = "";


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = "Please enter a valid email.";
        return;
    }


    if (password1.length < 4 || password1.length > 20) {
        passwordError.textContent =
            "Password must be between 4 and 20 characters.";
        return;
    }

    if (password1 !== password2) {
        passwordError.textContent = "Passwords do not match.";
        return;
    }


    const users = JSON.parse(localStorage.getItem("users")) || [];
    const newUser = {
        email,
        password: password1,
        avatar: "img/placeholder-profile-icon.png", // Default user image
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Success message
    successMessage.className = "text-success alert alert-success mt-3";
    successMessage.textContent = "Registration successful! You can now log in.";

    // Clear the form
    document.getElementById("registrationForm").reset();
});
