document.addEventListener('DOMContentLoaded', function() {

    // =======================
    // Becky Button
    // =======================
    const beckyButton = document.getElementById('beckyButton');

    beckyButton.addEventListener('click', function() {
        location.reload();
    });

    // =======================
    // Shared show/hide helper
    // =======================
    function toggleDisplay(el) {
        el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
        return el.style.display;
    }

    // =======================
    // Sound Button Setup
    // =======================
    const soundButton = document.getElementById('soundButton');
    const clickSound = new Audio('sounds/imaginaryBeach.wav');
    const hoverSound = new Audio('sounds/edoFurin.wav');
    clickSound.loop = true;
    let isSoundOn = false;

    soundButton.addEventListener('click', function() {
        if (isSoundOn) {
            soundButton.textContent = "turn sound on";
            clickSound.muted = true;
        } else {
            soundButton.textContent = "turn sound off";
            clickSound.muted = false;
            clickSound.play();
        }
        isSoundOn = !isSoundOn;
    });

    soundButton.addEventListener('mouseover', function() {
        hoverSound.play();
    });

    // =======================
    // Ripple Effect Setup
    // =======================
    $('body').ripples({
        resolution: 512,
        dropRadius: 20, // px
        perturbance: 0.04,
        interactive: false
    });

    let isMouseDown = false;

    document.body.addEventListener('mousedown', function(event) {
        isMouseDown = true;
        triggerRipple(event.clientX, event.clientY);
    });

    document.body.addEventListener('mousemove', function(event) {
        if (isMouseDown) {
            triggerRipple(event.clientX, event.clientY);
        }
    });

    document.body.addEventListener('mouseup', function() {
        isMouseDown = false;
    });

    function triggerRipple(x, y) {
        $('body').ripples('drop', x, y, 20, 0.04);
    }

    // =======================
    // Artwork Button
    // =======================
    const workButton = document.getElementById('work-button');
    const artworkList = document.getElementById('artwork-list');

    workButton.addEventListener('click', function() {
        const state = toggleDisplay(artworkList);
        if (state === 'none') workButton.textContent = 'work'; // Reset button text
    });

    // =======================
    // Artwork List Setup
    // =======================
    const categories = ["websites", "performances", "games", "films", "photographs"];

    fetch('artworks.json')
        .then(response => response.json())
        .then(({ artworks }) => {
            const list = document.getElementById('artwork-list');

            const byCategory = artworks.reduce((groups, artwork) => {
                const key = artwork.category.toLowerCase();
                (groups[key] ??= []).push(artwork);
                return groups;
            }, {});

            categories.forEach(category => {
                const categoryHeader = document.createElement('h2');
                categoryHeader.textContent = category;
                list.appendChild(categoryHeader);

                (byCategory[category] || []).forEach(artwork => {
                    const listItem = document.createElement('div');
                    listItem.classList.add('artwork-item');

                    const inner = `${artwork.date} <em>${artwork.title}</em> ${artwork.location || ''}`;

                    if (artwork.url) {
                        const link = document.createElement('a');
                        link.href = artwork.url;
                        link.target = "_blank";
                        link.innerHTML = inner;
                        listItem.appendChild(link);
                    } else {
                        listItem.innerHTML = inner;
                    }

                    list.appendChild(listItem);
                });
            });
        })
        .catch(error => console.error('Error loading artworks:', error));

    // =======================
    // About Button Toggle
    // =======================
    const aboutButton = document.getElementById('aboutButton');
    const aboutText = document.getElementById('aboutText');

    aboutText.style.display = 'none';

    function positionAboutText() {
        const btnRect = beckyButton.getBoundingClientRect();
        aboutText.style.top = btnRect.top + 'px';
        aboutText.style.left = btnRect.right + 'px';
    }

    positionAboutText(); // set the initial position on page load

    // Recalculate whenever the layout could have changed size (window resize, browser zoom)
    window.addEventListener('resize', positionAboutText);
    if (window.visualViewport) {
        // Some browsers (e.g. pinch-zoom on trackpads/mobile) only fire this, not window resize
        window.visualViewport.addEventListener('resize', positionAboutText);
    }

    // The custom "Andale Mono" font can finish loading after the initial layout, which changes
    // beckyButton's rendered width - reposition once it's actually ready
    if (document.fonts) {
        document.fonts.ready.then(positionAboutText);
    }

    aboutButton.addEventListener('click', function() {
        positionAboutText(); // make sure position is current before revealing it
        toggleDisplay(aboutText);
    });

    // =======================
    // Toggle Text
    // =======================
    const toggleText = document.getElementById('toggleText');
    const words = ['collaborate', 'chat', 'gossip'];
    let currentIndex = 0;

    toggleText.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % words.length;
        toggleText.textContent = words[currentIndex];
    });

    // =======================
    // Hide email
    // =======================
    const emailAddress = 'a.beautiful.place01' + '@' + 'gmail.com';
    const emailLinks = document.querySelectorAll('.emailLink');
    emailLinks.forEach(link => {
        link.href = 'mailto:' + emailAddress;
        link.innerText = 'e-mail';
    });
});