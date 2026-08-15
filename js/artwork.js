// NOTE: this file isn't loaded by index.html (no <script> tag references it there) - it looks
// like it's meant for a separate per-artwork detail page (it targets `header h1`, which doesn't
// exist in index.html). Left its behaviour untouched, just tidied the structure to match scripts.js.

document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');

    fetch('artworks.json')
        .then(response => response.json())
        .then(({ artworks }) => { // CHANGED: destructure `artworks` directly instead of `data` then `data.artworks`
            const artwork = artworks.find(art => art.title === title);
            if (!artwork) return; // CHANGED: early return instead of wrapping the whole body in an `if (artwork)` block

            document.title = artwork.title;
            document.querySelector('header h1').innerText = artwork.title;
            document.getElementById('artwork-image').src = `images/${artwork.image}`;
            document.getElementById('artwork-date').innerText = artwork.date;
            document.getElementById('artwork-description').innerText = artwork.description || '';
        })
        .catch(error => console.error('Error loading artwork details:', error));
});