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
