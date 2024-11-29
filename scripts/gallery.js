document.addEventListener("DOMContentLoaded", () => {

    async function fetchGallery() {
        const galleryGrid = document.getElementById("galleryGrid");

        if (!galleryGrid) {
            console.error("Error: galleryGrid element not found!");
            return;
        }

        try {
            const response = await fetch("https://api.escuelajs.co/api/v1/products");
            if (!response.ok) {
                throw new Error("Failed");
            }

            const photos = await response.json();

            // Limit to 30 photos for the gallery
            photos.slice(0, 30).forEach((photo) => {
                const galleryItem = document.createElement("div");
                galleryItem.className = "col-md-4 mb-4";

                galleryItem.innerHTML = `
          <div class="card">
            <img src="${photo.category.image}" class="card-img-top" alt="${photo.title}">
            <div class="card-body">
              <h5 class="card-title">${photo.title}</h5>
            </div>
          </div>
        `;
                galleryGrid.appendChild(galleryItem);
            });
        } catch (error) {
            console.error("Error fetching", error);
            alert("Unable to load gallery.");
        }
    }


    fetchGallery();
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