let latest = "the_passing_seasons"

window.addEventListener("load", async function () {
    const article = new URLSearchParams(window.location.search).get("note");
    const file = await fetch(article + ".md");
    if (article === null) {
        const url = new URL(window.location);
        url.searchParams.append("note", latest);
        window.location.replace(url);
    } else if (file.status === 404) {
        const url = new URL(window.location);
        url.searchParams.set("note", latest);
        window.location.replace(url);
    } else {
        document.getElementById("article").src = article + ".md";
        const text = await file.text();
        const metadata = {};
        const metadataRegex = /\[\/\/]: # \(([^:]+): "([^"]+)"\)/g;
        let match;
        while ((match = metadataRegex.exec(text)) !== null) {
            const [ , key, value ] = match;
            metadata[key.trim()] = value.trim();
        }
        document.getElementById("title").innerText = metadata.title;
        document.getElementById("author-date").innerText = metadata.author + " | " + metadata.date;
        document.getElementById("tags").innerText = metadata.tags;
    }
})
