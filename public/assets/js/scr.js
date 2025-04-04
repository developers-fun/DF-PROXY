document.getElementById("urlinput").onsubmit = function (event) {
    event.preventDefault();

    let url = document.getElementById("urlInput").value; // if no periods are detected in the input, search google instead
    let searchUrl = "https://www.google.com/search?q=";

    if (!url.includes(".")) {
        url = searchUrl + encodeURIComponent(url);
    } else {
        if (!url.startsWith("http://") && !url.startsWith("https://")) { // if no http or https is detected, add https automatically
            url = "https://" + url;
        }
    }

    iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);
};