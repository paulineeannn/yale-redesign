document.addEventListener("DOMContentLoaded", () => {
    const timelineData = [
        { year: "1832", event: "The Trumbull Gallery, founded by Colonel John Trumbull and Professor Benjamin Silliman, opens, marking the beginning of visual arts study at Yale." },
        { year: "1858", event: "An art exhibition directed by College Librarian Daniel Coit Gilman leads to the establishment of an art school." },
        { year: "1864", event: "Augustus Russell Street's generosity enables the founding of Yale's art school, overseen by an art council including Samuel F. B. Morse." },
        { year: "1869", event: "Yale School of the Fine Arts opens, directed by John Ferguson Weir, with classes in drawing, painting, sculpture, and art history." },
        { year: "1871", event: "The Jarves Collection of early Italian paintings is acquired, augmenting the collections in Street Hall." },
        { year: "1908", event: "Architectural instruction begins." },
        { year: "1916", event: "Architecture is established as a department, led by Everett Victor Meeks." },
        { year: "1925", event: "Drama is added as a department under George Pierce Baker, with a separate building." },
        { year: "1928", event: "A new art gallery, designed by Egerton Swartwout and funded by Edward S. Harkness, opens, connected to Street Hall by a bridge." },
        { year: "1953", event: "A large addition to the Art Gallery, designed by Louis I. Kahn and funded by the Campbell family and other friends of the arts, opens." },
        { year: "1955", event: "The Drama department becomes an independent school." },
        { year: "1959", event: "The School of Art and Architecture becomes a fully graduate professional school." },
        { year: "1963", event: "The Art and Architecture Building, designed by Paul Rudolph, opens." },
        { year: "1969", event: "The School of Art and Architecture is divided into two faculties, each with its own dean." },
        { year: "1972", event: "The School of Art and the School of Architecture become separate schools, sharing the Rudolph Building until 2000." },
        { year: "2009", event: "A new arts complex, designed by Deborah Berke, opens at 1156 Chapel Street and 353 Crown Street, housing all departments of the School of Art except sculpture." },
        { year: "2009", event: "Sculpture moves to a new building at 36 Edgewood Avenue, adjacent to a new gallery at 32 Edgewood Avenue, both designed by Kieran Timberlake." }
    ];

    const timelineBody = document.getElementById("timeline-body");

    timelineData.forEach(item => {
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
});
