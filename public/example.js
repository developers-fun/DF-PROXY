function g(event) {
    event.preventDefault();

    const input = document.getElementById("url");
    let url = input.value.trim();
    const searchUrl = "https://www.google.com/search?q=";

    if (!url.includes(".")) {
        url = searchUrl + encodeURIComponent(url);
    } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    // Assuming you're using Ultraviolet's config
    const finalUrl = __uv$config.prefix + __uv$config.encodeUrl(url);
    
    // Open in new tab or redirect the current window
    window.location.href = finalUrl; // or use window.open(finalUrl, '_blank')
}
