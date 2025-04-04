const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

const wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
const bareUrl = (location.protocol === "https:" ? "https" : "http") + "://" + location.host + "/bare/";
const iframeWindow = document.getElementById("iframeWindow");

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
        await loadURL(autoUrl);
    }
});
