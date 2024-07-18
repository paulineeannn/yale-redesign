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
        return [];
    }
}

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

            const eventDiv = document.createElement("div");
            eventDiv.className = "container-events";

            eventDiv.innerHTML = `
                <div class="container-date">
                    <div class="container-month">
                        <h3>${event.month}</h3>
                    </div>
                    <p class="text-calender-day">${event.day}</p>
                </div>

                <div class="container-event-details">
                    <h3>${event.eventName}</h3>
                    <p class="p-smaller">${formattedTime}</p>
                    <p class="p-smaller">${event.location}</p>
                </div>
            `;

            eventsList.appendChild(eventDiv);
        }
    });

    if (eventsList.children.length === 0) {
        const noEventsMessage = document.createElement("p");
        noEventsMessage.textContent = "No events to show.";
        eventsList.appendChild(noEventsMessage);
    }

    // update button based on selected
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

function showFutureEvents() {
    populateEvents("future");
}

function showPastEvents() {
    populateEvents("past");
}

// Initially show past events
showPastEvents();