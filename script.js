
document.addEventListener("DOMContentLoaded", () => {
    fetch('../json/timeline.json')
        .then(response => response.json())
        .then(data => {
            const timelineBody = document.getElementById("timeline-body");

            data.forEach(item => {
                const row = document.createElement("tr");

                const yearCell = document.createElement("td");
                yearCell.className = "cell-year";
                yearCell.innerHTML = `<b class="text-year">${item.year}</b>`;
                row.appendChild(yearCell);

                const eventCell = document.createElement("td");
                eventCell.className = "cell-event";
                eventCell.textContent = item.event;
                row.appendChild(eventCell);

                timelineBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching timeline data:', error);
        });
});
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

// News page
document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById("news-container");

    fetch('../json/news.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(news => {
                const newsItem = `
                    <div class="card-news">
                        <div class="container-card-news-img">
                            <img src="${news.url}" alt="${news.heading}">
                        </div>
                        <div class="container-card-news-text">
                            <h3 class="text-news-heading">${news.heading}</h3>
                            <p class="text-news-date"><i>${news.date}</i></p>
                        </div>
                    </div>
                `;
                newsContainer.innerHTML += newsItem;
            });
        })
        .catch(error => console.error('Error fetching news:', error));
});

// Function to fetch events data from JSON file
async function fetchEvents() {
    try {
        const response = await fetch('../json/events.json');
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        const events = await response.json();
        return events;
    } catch (error) {
        console.error('Error fetching events:', error.message);
        return []; // Return an empty array in case of error
    }
}

// Function to fetch events data from JSON file
async function fetchEvents() {
    try {
        const response = await fetch('../json/events.json');
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        const events = await response.json();
        return events;
    } catch (error) {
        console.error('Error fetching events:', error.message);
        return []; // Return an empty array in case of error
    }
}

// Function to populate events based on type (future or past)
async function populateEvents(type) {
    const eventsList = document.getElementById("eventsList");
    eventsList.innerHTML = "";

    const today = new Date();
    const events = await fetchEvents();

    events.forEach(event => {
        const eventDate = new Date(`${event.month} ${event.day}, 2024`);

        if ((type === "future" && eventDate >= today) || (type === "past" && eventDate < today)) {
            // Format the event date and time
            const options = { month: 'short', day: 'numeric' };
            const formattedDate = eventDate.toLocaleDateString('en-US', options);
            const formattedTime = event.time;

            // Create container for each event
            const eventDiv = document.createElement("div");
            eventDiv.className = "container-events";

            // Create HTML using template literal
            eventDiv.innerHTML = `
                <div class="container-date">
                    <div class="container-month">
                        <h3>${event.month}</h3>
                    </div>
                    <p class="text-calender-day">${event.day}</p>
                </div>

                <div class="container-event-details">
                    <h3>${event.eventName}</h3>
                    <p class="p-smaller">${formattedTime}, ${formattedDate}</p>
                    <p class="p-smaller">${event.location}</p>
                </div>
            `;

            // Append event container to eventsList
            eventsList.appendChild(eventDiv);
        }
    });

    // Handle case where no events are present
    if (eventsList.children.length === 0) {
        const noEventsMessage = document.createElement("p");
        noEventsMessage.textContent = "No events to show.";
        eventsList.appendChild(noEventsMessage);
    }

    // Update button styles based on selection
    const futureBtn = document.getElementById("button-future");
    const pastBtn = document.getElementById("button-past");

    if (type === "future") {
        futureBtn.classList.add("selected");
        pastBtn.classList.remove("selected");
    } else if (type === "past") {
        pastBtn.classList.add("selected");
        futureBtn.classList.remove("selected");
    }
}

// Function to show future events
function showFutureEvents() {
    populateEvents("future");
}

// Function to show past events
function showPastEvents() {
    populateEvents("past");
}

// Initially show past events
showPastEvents();