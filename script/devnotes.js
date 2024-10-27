let latest = "the_passing_seasons"

window.addEventListener("load", async function () {
    const article = new URLSearchParams(window.location.search).get("note");

    const file = await fetch(article + ".md", {method: "HEAD"});

    if (article === null) {
        const url = new URL(window.location);
        url.searchParams.append("note", latest);
        window.location.replace(url);
    } else if (file.status === 404) {
        const url = new URL(window.location);
        url.searchParams.set("note", latest);
        console.log(url);
        window.location.replace(url);
    } else {
        document.getElementById("article").src = article + ".md";
    }
})
