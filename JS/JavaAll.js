/* JS code for the indiefind project that will be applied to all pages. Any other code that is page specific will be in other js files.*/

document.addEventListener('DOMContentLoaded', function() {
    // Highlight active navbar link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#navbar a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.style.borderBottomColor = '#3498db';
            link.style.color = '#3498db';
        }
    });

    // Hamburger menu functionality
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navbar = document.getElementById('navbar');

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function() {
            navbar.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('active');
                hamburgerBtn.classList.remove('active');
            });
        });
    }
});