document.addEventListener("DOMContentLoaded", () => {

    const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    const userEmailSpan = document.getElementById("userEmail");


    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (loggedInUserEmail) {

        const loggedInUser = storedUsers.find(user => user.email === loggedInUserEmail);

        if (!loggedInUser) {
            console.warn("User not found.");
            window.location.href = "login.html";
            return;
        } else {
            userEmailSpan.textContent = loggedInUser.email;

        }
    } else {
        console.warn("No logged-in user.");
        window.location.href = "login.html";
        return;
    }


    document.getElementById("logoutButton").addEventListener("click", () => {
        localStorage.removeItem("loggedInUserEmail"); // Clear session
        window.location.href = "login.html"; // Redirect to login page
    });


    async function fetchPosts() {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const posts = await response.json();
            const postsGrid = document.getElementById("postsGrid");
            posts.slice(0, 24).forEach((post) => {
                const postCard = document.createElement("div");
                postCard.className = "col-md-4 mb-4";
                postCard.innerHTML = `
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.body}</p>
                <a href="singlepost.html?id=${post.id}" class="btn btn-primary">Read More</a>
              </div>
            </div>
          `;
                postsGrid.appendChild(postCard);
            });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }


    fetchPosts();
});
