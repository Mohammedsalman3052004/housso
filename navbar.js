document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const body = document.body;
    const navLinkItems = document.querySelectorAll('.nav-link-items');
    const projectDropdown = document.getElementById('projectDropdown');
    const ongoingSubmenu = document.getElementById('ongoingSubmenu');

    // Toggle mobile menu
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Close mobile menu
    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
        // Close all dropdowns
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.classList.remove('active');
        });
    }

    // Mobile dropdown functionality
    function toggleDropdown(item, event) {
        if (window.innerWidth <= 768) {
            event.preventDefault();
            event.stopPropagation();
            
            // Close other dropdowns
            document.querySelectorAll('.nav-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            item.classList.toggle('active');
        }
    }

    // Mobile submenu functionality
    function toggleSubmenu(item, event) {
        if (window.innerWidth <= 768) {
            event.preventDefault();
            event.stopPropagation();
            
            // Close other submenus
            document.querySelectorAll('.dropdown-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current submenu
            item.classList.toggle('active');
        }
    }

    // Event listeners
    hamburger.addEventListener('click', toggleMenu);

    // Project dropdown click handler for mobile
    projectDropdown.addEventListener('click', function(e) {
        toggleDropdown(this, e);
    });

    // Ongoing submenu click handler for mobile
    ongoingSubmenu.addEventListener('click', function(e) {
        toggleSubmenu(this, e);
    });

    // Close menu when clicking on regular nav links (not dropdowns)
    navLinkItems.forEach(link => {
        if (!link.querySelector('.dropdown-arrow')) {
            link.addEventListener('click', closeMenu);
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    closeMenu();
                }
            }
        });
    });

    // Prevent submenu links from closing the menu immediately on mobile
    document.querySelectorAll('.submenu-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // Add a small delay before closing to allow for navigation
                setTimeout(closeMenu, 300);
            }
        });
    });

    // Handle dropdown hover on desktop
    projectDropdown.addEventListener('mouseenter', function() {
        if (window.innerWidth > 768) {
            this.classList.add('active');
        }
    });

    projectDropdown.addEventListener('mouseleave', function() {
        if (window.innerWidth > 768) {
            this.classList.remove('active');
        }
    });
});