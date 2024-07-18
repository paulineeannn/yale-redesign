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