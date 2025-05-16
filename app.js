// app.js
async function loadHTML(url, elementId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
            document.getElementById(elementId).innerHTML = `<p style="color:red; text-align:center;">Error: Could not load content from ${url}. Check console.</p>`;
            return;
        }
        const text = await response.text();
        document.getElementById(elementId).innerHTML = text;
    } catch (error) {
        console.error(`Error fetching or parsing ${url}:`, error);
        document.getElementById(elementId).innerHTML = `<p style="color:red; text-align:center;">Error: Could not load content from ${url}. Is the file path correct? Check console.</p>`;
    }
}

function toggleMobileMenu() {
    const navUl = document.querySelector('#main-nav ul');
    if (navUl) { // Check if navUl exists, as it's loaded dynamically
        navUl.classList.toggle('active');
    } else {
        console.warn("Mobile navigation UL not found. It might not be loaded yet.");
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // Load header and footer
    const headerPromise = loadHTML('header.html', 'header-placeholder');
    const footerPromise = loadHTML('footer.html', 'footer-placeholder');

    // It's important that the mobile menu toggle is set up *after* the header HTML is loaded
    // and the #main-nav ul exists.
    // We can ensure this by waiting for the header to load.
    headerPromise.then(() => {
        // Now that header.html is injected, the toggle function can find its elements.
        // The onclick in header.html will now work correctly.
        // If you had more complex JS for the header, you'd initialize it here.
        console.log("Header loaded, mobile menu toggle should be functional.");
    });
});