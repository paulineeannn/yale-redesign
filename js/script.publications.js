document.addEventListener("DOMContentLoaded", () => {
    const bookDetailsContainer = document.getElementById("book-details-container");
    const bookDotsContainer = document.getElementById("book-dots-container");
    const commencementDetailsContainer = document.getElementById("commencement-details-container");
    const commencementDotsContainer = document.getElementById("commencement-dots-container");
    let currentBookIndex = 0;
    let currentCommencementIndex = 0;
    let booksData = [];
    let commencementsData = [];

    // Fetch books data
    fetch('../json/books.json')
        .then(response => response.json())
        .then(data => {
            booksData = data;
            displayItem(bookDetailsContainer, booksData, currentBookIndex, "book");

            for (let i = 0; i < booksData.length; i++) {
                const dot = document.createElement("span");
                dot.classList.add("dot");
                if (i === currentBookIndex) {
                    dot.classList.add("active");
                }
                dot.addEventListener("click", () => {
                    currentBookIndex = i;
                    updateDots(bookDotsContainer, currentBookIndex);
                    displayItem(bookDetailsContainer, booksData, currentBookIndex, "book");
                });
                bookDotsContainer.appendChild(dot);
            }
        })
        .catch(error => console.error('Error fetching book data:', error));

    // Fetch commencements data
    fetch('../json/commencements.json')
        .then(response => response.json())
        .then(data => {
            commencementsData = data;
            displayItem(commencementDetailsContainer, commencementsData, currentCommencementIndex, "commencement");

            for (let i = 0; i < commencementsData.length; i++) {
                const dot = document.createElement("span");
                dot.classList.add("dot");
                if (i === currentCommencementIndex) {
                    dot.classList.add("active");
                }
                dot.addEventListener("click", () => {
                    currentCommencementIndex = i;
                    updateDots(commencementDotsContainer, currentCommencementIndex);
                    displayItem(commencementDetailsContainer, commencementsData, currentCommencementIndex, "commencement");
                });
                commencementDotsContainer.appendChild(dot);
            }
        })
        .catch(error => console.error('Error fetching commencement data:', error));

    function displayItem(container, data, index, type) {
        const item = data[index];
        let readMoreHtml = "";
        if (type === "book") {
            readMoreHtml = `
                <div class="container-readmore">
                    <a href='${item.url}' target='_blank' class="button-blue">Open in Library System</a>
                </div>
            `;
        }
        container.innerHTML = `
            <div class="container-item active">
                <div class="container-item-img">
                    <img src="${item.imageUrl}" alt="${item.title}">
                </div>
                <div class="container-item-details">
                    <div class="container-item-texts">
                        <h3 class="text-item-title">${item.title}</h3>
                        <h4 class="text-item-date">${item.date}</h4>
                        <p class="text-item-description">${item.description}</p>
                        <p class="p-smaller">${item.pages}</p>
                    </div>
                    ${readMoreHtml}
                </div>
            </div>
        `;
    }

    function updateDots(container, index) {
        const dots = container.getElementsByClassName("dot");
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }
        dots[index].classList.add("active");
    }
});
