// ===================================
// Mobile Menu Toggle
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnBurger = burgerMenu.contains(event.target);

            if (!isClickInsideNav && !isClickOnBurger && navLinks.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});

// ===================================
// Contact Form Handling
// ===================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            hairType: document.getElementById('hairType').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (validateForm(formData)) {
            // Show success message
            showMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
        }
    });
}

function validateForm(data) {
    if (!data.name.trim()) {
        showMessage('Please enter your name.', 'error');
        return false;
    }

    if (!validateEmail(data.email)) {
        showMessage('Please enter a valid email address.', 'error');
        return false;
    }

    if (!data.subject.trim()) {
        showMessage('Please enter a subject.', 'error');
        return false;
    }

    if (!data.message.trim() || data.message.trim().length < 10) {
        showMessage('Please enter a message (at least 10 characters).', 'error');
        return false;
    }

    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showMessage(message, type) {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        padding: 1.5rem 2rem;
        border-radius: 12px;
        font-weight: 600;
        z-index: 9999;
        animation: slideDown 0.3s ease-out;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        max-width: 90%;
        text-align: center;
    `;

    if (type === 'success') {
        messageDiv.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        messageDiv.style.color = '#ffffff';
    } else {
        messageDiv.style.background = '#e74c3c';
        messageDiv.style.color = '#ffffff';
    }

    document.body.appendChild(messageDiv);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 5000);
}

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Only prevent default for internal anchors (not just '#')
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// Fade-in Animation on Scroll
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.faq-item, .expertise-item, .contact-method, .author-card');
    animateElements.forEach(el => observer.observe(el));
});

// ===================================
// Add CSS animation keyframes dynamically
// ===================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Navbar Background on Scroll
// ===================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    }

    lastScroll = currentScroll;
});

// ===================================
// Table Responsiveness Enhancement
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        // Wrap table in responsive container if not already wrapped
        if (!table.parentElement.classList.contains('features-table')) {
            const wrapper = document.createElement('div');
            wrapper.style.overflowX = 'auto';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        }
    });
});

// ===================================
// Enhanced Image Loading
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in';
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        // If image is already cached
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
});

// ===================================
// Copy to Clipboard Functionality (if needed)
// ===================================

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showMessage('Copied to clipboard!', 'success');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showMessage('Copied to clipboard!', 'success');
        } catch (err) {
            showMessage('Failed to copy', 'error');
        }
        
        document.body.removeChild(textArea);
    }
}

// ===================================
// Print Functionality
// ===================================

function printPage() {
    window.print();
}

// ===================================
// Back to Top Button (Optional Enhancement)
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        z-index: 999;
    `;

    document.body.appendChild(backToTopButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });

    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effect
    backToTopButton.addEventListener('mouseenter', () => {
        backToTopButton.style.transform = 'translateY(-5px)';
        backToTopButton.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
    });

    backToTopButton.addEventListener('mouseleave', () => {
        backToTopButton.style.transform = 'translateY(0)';
        backToTopButton.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
    });
});

// ===================================
// Console Welcome Message
// ===================================

console.log('%c Welcome to Gentlemen Republic! ', 'background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-size: 16px; padding: 10px;');
console.log('%c Discover the best hair gel for men ', 'color: #667eea; font-size: 14px;');