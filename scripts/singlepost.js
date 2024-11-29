document.addEventListener("DOMContentLoaded", () => {

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");
    console.log(postId);

    if (!postId) {
        alert("No post ID.");
        window.location.href = "index.html";
        return;
    }


    async function fetchSinglePost() {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            if (!response.ok) {
                throw new Error("Failed fetch.");
            } else {
                const post = await response.json();
                console.log(postId);
                const postContainer = document.getElementById("postContainer");
                postContainer.innerHTML = `
            <div class="card">
              <div class="card-body">
              <img src="https://static.vecteezy.com/system/resources/thumbnails/022/999/227/small_2x/post-button-click-png.png" alt="Post image">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.body}</p>
              </div>
            </div>
          `;
            }
        } catch (error) {
            console.error("Error fetching", error);
            alert("Unable to fetch.");
            window.location.href = "index.html";
        }
    }


    fetchSinglePost();
});


const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
const userEmailSpan = document.getElementById("userEmail");
if (loggedInUserEmail) {
    userEmailSpan.textContent = loggedInUserEmail;
}


document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem("loggedInUserEmail");
    window.location.href = "login.html";
});

