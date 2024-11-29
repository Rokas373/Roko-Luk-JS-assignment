document.addEventListener("DOMContentLoaded", () => {

    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];


    const userAvatar = document.getElementById("userAvatar");
    const userEmail = document.getElementById("profileEmail");
    const userPassword = document.getElementById("userPassword");
    const updateProfileForm = document.getElementById("updateProfileForm");
    const newAvatarInput = document.getElementById("newAvatar");
    const newPasswordInput = document.getElementById("newPassword");
    const successMessage = document.getElementById("successMessage");
    const logoutButton = document.getElementById("logoutButton");

    let loggedInUser;

    if (loggedInUserEmail) {
        loggedInUser = storedUsers.find(user => user.email === loggedInUserEmail);

        if (loggedInUser) {
            userAvatar.src = loggedInUser.avatar;
            userEmail.textContent = `Email: ${loggedInUser.email}`;
            userPassword.textContent = `Password: ${loggedInUser.password}`;
        } else {
            alert("User not found.");
            window.location.href = "login.html";
            return;
        }
    } else {
        alert("No logged-in user.");
        window.location.href = "login.html";
        return;
    }

    updateProfileForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newAvatar = newAvatarInput.value.trim();
        const newPassword = newPasswordInput.value.trim();

        if (newAvatar) {
            loggedInUser.avatar = newAvatar;
            userAvatar.src = newAvatar;
        }

        if (newPassword) {
            loggedInUser.password = newPassword;
            userPassword.textContent = `Password: ${newPassword}`;
        }

        const updatedUsers = storedUsers.map(user =>
            user.email === loggedInUserEmail ? loggedInUser : user
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        successMessage.className = "alert alert-success text-success mt-3";
        successMessage.textContent = "Profile updated successfully!";
        setTimeout(() => {
            successMessage.className = "";
            successMessage.textContent = "";
        }, 3000);

        newAvatarInput.value = "";
        newPasswordInput.value = "";
    });

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("loggedInUserEmail");
        window.location.href = "login.html";
    });
});

const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
const userEmailSpan = document.getElementById("userEmail");
if (loggedInUserEmail) {
    userEmailSpan.textContent = loggedInUserEmail;
}