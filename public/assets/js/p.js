const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

const wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
const bareUrl = (location.protocol === "https:" ? "https" : "http") + "://" + location.host + "/bare/";

const urlInput = document.getElementById("urlInput");
const iframeWindow = document.getElementById("iframeWindow");

// Handle Enter key to trigger search
urlInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchButton").click();
    }
});

document.getElementById("searchButton").onclick = async function (event) {
    event.preventDefault();
    const userInput = urlInput.value;
    await loadURL(userInput);
};

// Switching between Epoxy and Bare
document.getElementById("switcher").onchange = async function (event) {
    switch (event.target.value) {
        case "epoxy":
            await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
            break;
        case "bare":
            await connection.setTransport("/baremod/index.mjs", [bareUrl]);
            break;
    }
};

// Load and encode the URL
async function loadURL(rawUrl) {
    let url = rawUrl.trim();
    const searchBase = "https://www.google.com/search?q=";

    if (!url.includes(".")) {
        url = searchBase + encodeURIComponent(url);
    } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    // Ensure transport is ready
    if (!await connection.getTransport()) {
        await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
    }

    // Set iframe src
    iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);
}

// ✅ Handle URL param like ?url=example.com
window.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const autoUrl = params.get("url");

    if (autoUrl) {
        urlInput.value = autoUrl;
        await loadURL(autoUrl);
    }
});

