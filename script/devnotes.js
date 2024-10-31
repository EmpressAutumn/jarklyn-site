window.addEventListener("load", async function () {
    const urlArticle = new URLSearchParams(window.location.search).get("note");
    fetch("articles.json")
        .then(response => {
            return response.json();
        })
        .then(articles => {
            const latest = Object.keys(articles)[0];
            const file = fetch(urlArticle + ".md");
            if (urlArticle === null) {
                const url = new URL(window.location);
                url.searchParams.append("note", latest);
                window.location.replace(url);
            } else if (file.status === 404) {
                const url = new URL(window.location);
                url.searchParams.set("note", latest);
                window.location.replace(url);
            } else {
                document.getElementById("article").src = urlArticle + ".md";
                document.getElementById("title").innerText = articles[urlArticle].title;
                document.getElementById("author-date").innerText = articles[urlArticle].author + " | " + articles[urlArticle].date;
                document.getElementById("tags").innerText = articles[urlArticle].tags;
                Object.keys(articles).forEach(article => {
                    console.log(Object.keys(articles))
                    let title;
                    if (article === urlArticle) {
                        let t = articles[article].title;
                        title = `<p class="author-date"><b>${t}</b></p>`
                    } else {
                        let t = articles[article].title;
                        title = `<p class="author-date"><a href="/devnotes/?note=${article}"><b>${t}</b></a></p>`
                    }
                    const author = articles[article].author;
                    const date = articles[article].date;
                    document.getElementById("blogposts").innerHTML += `
                        <div class="blogpost">
                            ${title}
                            <p class="author-date">${author}</p>
                            <p class="author-date">${date}</p>
                        </div>`;
                })
            }
        });
})
