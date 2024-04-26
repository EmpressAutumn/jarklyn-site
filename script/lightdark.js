import { getCookie, setCookie } from "cookies.js"

window.addEventListener("load", function() {
    if (getCookie("darkmode") == "false") {
        document.getElementsByTagName("head")[0].appendChild("/style/light.css")
    }
    else if (getCookie("darkmore") == "true") {
        document.getElementsByTagName("head")[0].appendChild("/style/dark.css")
    }
    else {
        setCookie("darkmode", "true")
    }
})
