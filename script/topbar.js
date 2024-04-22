window.addEventListener('load', function() {
    fetch("/topbar.html")
        .then(response => response.text())
        .then((data) => {
            document.getElementById("topbar").innerHTML = data
        })
})
