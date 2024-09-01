document.addEventListener('DOMContentLoaded', function() {
    console.log("Script loaded and running"); // Debugging marker


    // =======================
    // Becky Button
    // =======================
    const beckyButton = document.getElementById('beckyButton');

    // Add a click event listener to reload the page
    beckyButton.addEventListener('click', function() {
        location.reload(); // Reloads the current page
    });

    // =======================
    // Sound Button Setup
    // =======================
    const soundButton = document.getElementById('soundButton');
    const clickSound = new Audio('sounds/imaginaryBeach.wav');
    const hoverSound = new Audio('sounds/edoFurin.wav'); // Load the hover sound
    clickSound.loop = true; // Ensure the sound loops continuously
    console.log(soundButton); // Check if the element is correctly retrieved
    let isSoundOn = false;

    // Add click event listener
    soundButton.addEventListener('click', function() {
        console.log("Sound button clicked"); // Debugging marker
        if (isSoundOn) {
            soundButton.textContent = "turn sound on";
            clickSound.muted = true; // Mute the sound
        } else {
            soundButton.textContent = "turn sound off";
            clickSound.muted = false; // Unmute the sound
            clickSound.play(); // Ensure the sound is playing when unmuted
        }

        // Toggle the state
        isSoundOn = !isSoundOn;
    }); 

    // Add 'hover' (mouseover) event listener 
    soundButton.addEventListener('mouseover', function() {
        hoverSound.play(); // Play the hover sound
    });


    // =======================
    // Ripple Effect Setup
    // =======================
    // Initialize ripples without mouse interaction
    $('body').ripples({
        resolution: 512,
        dropRadius: 20, // px
        perturbance: 0.04,
        interactive: false // Disable automatic ripple interaction
    });

    // Continuous ripple effect while holding down the mouse
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
    
    // Toggle the visibility of the artwork list when the button is clicked
    workButton.addEventListener('click', function() {
        if (artworkList.style.display === 'none' || artworkList.style.display === '') {
            artworkList.style.display = 'block'; // Show the artwork list
            // workButton.textContent = 'hide work'; // Change button text
        } else {
            artworkList.style.display = 'none'; // Hide the artwork list
            workButton.textContent = 'work'; // Reset button text
        }
    });

    // =======================
    // Artwork List Setup
    // =======================
    const categories = ["websites", "games", "films", "photography", "performances"];
    fetch('artworks.json')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('artwork-list');
    
            categories.forEach(category => {
                const categoryHeader = document.createElement('h2');
                categoryHeader.textContent = category;
                list.appendChild(categoryHeader);
    
                const categoryArtworks = data.artworks.filter(artwork => artwork.category.toLowerCase() === category);
                categoryArtworks.forEach(artwork => {
                    const link = document.createElement('a');
                    link.href = '#'; // Prevents the link from navigating anywhere
                    link.innerHTML = `${artwork.date} <em>${artwork.title}</em> ${artwork.location || ''}`;
                    link.addEventListener('click', function(event) {
                        event.preventDefault(); // Prevents any action from happening on click
                        // No further action needed for now
                    });
                    list.appendChild(link);
                });
            });
        })
        .catch(error => console.error('Error loading artworks:', error));
    

});
