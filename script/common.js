window.addEventListener("load", function() {
    fetch("/topbar.html")
        .then(response => response.text())
        .then((data) => {
            document.getElementById("topbar").innerHTML = data

            const toggleButton = document.getElementById("mode-toggle");
            if (toggleButton) {
                toggleButton.addEventListener("click", toggleMode);
            }
        })
})

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Function to toggle between light and dark mode
function toggleMode() {
    const currentMode = getCookie("theme") || "light";
    const newMode = currentMode === "light" ? "dark" : "light";
    setCookie("theme", newMode, 365);  // Save new mode for one year
    location.reload();  // Reload page to apply new theme
}

// Apply the correct CSS based on the theme cookie
function applyTheme() {
    const theme = getCookie("theme") || "light";
    const themeCss = document.getElementById('theme-css');

    console.log(`Applying theme: ${theme}`);

    themeCss.href = "/style/" + theme + ".css";
}

applyTheme()
