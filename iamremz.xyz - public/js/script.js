document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');

    // Set initial position for the trail dot
    trail.style.left = `${e.clientX - 5}px`; 
    trail.style.top = `${e.clientY - 5}px`;

    // Append the trail dot to the body
    document.body.appendChild(trail);

    // Remove the trail after animation ends (0.6s)
    setTimeout(() => {
        trail.remove();
    }, 600); // Matches the animation duration
});