// Job listing toggle functionality
function toggleJob(element) {
    const jobContent = element.nextElementSibling;
    const toggleIcon = element.querySelector('.toggle-icon');
    const allJobContents = document.querySelectorAll('.job-content');
    const allToggleIcons = document.querySelectorAll('.toggle-icon');
    
    // Close all other job contents
    allJobContents.forEach((content, index) => {
        if (content !== jobContent) {
            content.classList.remove('active');
            allToggleIcons[index].textContent = '+';
        }
    });
    
    // Toggle current job content
    if (jobContent.classList.contains('active')) {
        jobContent.classList.remove('active');
        toggleIcon.textContent = '+';
    } else {
        jobContent.classList.add('active');
        toggleIcon.textContent = '−';
    }
}

// File upload functionality
document.getElementById('resume').addEventListener('change', function(e) {
    const fileText = document.getElementById('file-text');
    const fileName = e.target.files[0]?.name;
    
    if (fileName) {
        fileText.textContent = fileName;
        fileText.style.color = '#4CAF50';
    } else {
        fileText.textContent = 'Select your file!';
        fileText.style.color = '#666';
    }
});

// Form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    
    // Basic validation
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert('Thank you for your application! We will get back to you soon.');
        event.target.reset();
        document.getElementById('file-text').textContent = 'Select your file!';
        document.getElementById('file-text').style.color = '#666';
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Form validation
function validateForm(data) {
    const requiredFields = ['name', 'email', 'phone', 'city', 'position', 'experience'];
    const missingFields = [];
    
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            missingFields.push(field);
        }
    });
    
    if (missingFields.length > 0) {
        alert('Please fill in all required fields: ' + missingFields.join(', '));
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s\-\+$$$$]+$/;
    if (!phoneRegex.test(data.phone)) {
        alert('Please enter a valid phone number.');
        return false;
    }
    
    return true;
}

// Mobile menu toggle
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
    const nav = document.querySelector('.nav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add loading animation to form inputs
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set first job as active by default
    const firstJobContent = document.querySelector('.job-content');
    const firstToggleIcon = document.querySelector('.toggle-icon');
    
    if (firstJobContent && firstToggleIcon) {
        firstJobContent.classList.add('active');
        firstToggleIcon.textContent = '−';
    }
    
    // Add fade-in animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.job-item, .application-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    const nav = document.querySelector('.nav');
    if (window.innerWidth > 768) {
        nav.style.display = 'flex';
    } else {
        nav.style.display = 'none';
    }
});




 // ===== HAMBURGER MENU FUNCTIONALITY =====
 document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const body = document.body;
    const navLinkItems = document.querySelectorAll('.nav-link-items');

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
    }

    // Event listeners
    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking on nav links
    navLinkItems.forEach(link => {
        link.addEventListener('click', closeMenu);
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
    navLinkItems.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});