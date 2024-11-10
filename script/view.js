window.addEventListener("load", async function () {
    const urlVideo = new URLSearchParams(window.location.search).get("v");
    fetch("videos.json")
        .then(response => {
            return response.json();
        })
        .then(articles => {
            const latest = Object.keys(articles)[0];
            if (urlVideo === null) {
                const url = new URL(window.location);
                url.searchParams.append("v", latest);
                window.location.replace(url);
            } else if (!Object.keys(articles).includes(urlVideo)) {
                const url = new URL(window.location);
                url.searchParams.set("v", latest);
                window.location.replace(url);
            } else {
                document.getElementById("player").src = "video/" + urlVideo + ".mp4";
                document.getElementById("title").innerText = articles[urlVideo].title;
                document.getElementById("date").innerText = articles[urlVideo].date;
                Object.keys(articles).forEach(article => {
                    let title;
                    if (article === urlVideo) {
                        let t = articles[article].title;
                        title = `<p class="author-date"><b>${t}</b></p>`
                    } else {
                        let t = articles[article].title;
                        title = `<p class="author-date"><a href="/view/?v=${article}"><b>${t}</b></a></p>`
                    }
                    const author = articles[article].author;
                    const date = articles[article].date;
                    document.getElementById("videos").innerHTML += `
                        <div class="video">
                            ${title}
                            <p class="author-date">${date}</p>
                        </div>`;
                })
            }
        });
})
