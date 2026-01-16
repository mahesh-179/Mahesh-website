// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const closeMenu = document.getElementById('closeMenu');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');
const currentYear = document.getElementById('year');

// Certificate Modal Elements
const modal = document.getElementById('certificateModal');
const modalImage = document.getElementById('modalCertificateImage');
const modalTitle = document.getElementById('modalCertificateTitle');
const modalIssuer = document.getElementById('modalCertificateIssuer');
const modalDate = document.getElementById('modalCertificateDate');
const modalId = document.getElementById('modalCertificateId');
const modalDescription = document.getElementById('modalCertificateDescription');
const modalLink = document.getElementById('modalCertificateLink');
const closeButtons = document.querySelectorAll('.close-modal');

// Certificate Data
const certificateData = {
    'python': {
        title: 'Python Programming Certification',
        issuer: 'Great Learning',
        date: 'May 2023',
        description: 'Comprehensive certification covering Python fundamentals, data structures, and object-oriented programming concepts. This certification validates expertise in Python programming language and its applications in real-world scenarios.',
        credentialId: 'GL-PYTHON-2023-05789',
        link: '#'
    },
    'web': {
        title: 'Web Development Fundamentals',
        issuer: 'The Digital Adda',
        date: 'March 2023',
        description: 'Certification covering HTML5, CSS3, JavaScript, and responsive design principles. Demonstrates proficiency in modern web development techniques and best practices.',
        credentialId: 'TDA-WEB-2023-03421',
        link: '#'
    },
    'responsive': {
        title: 'Responsive Web Design',
        issuer: 'FreeCodeCamp',
        date: 'May 7, 2025',
        description: 'Certification demonstrating proficiency in HTML, CSS, and JavaScript for responsive web development. Includes hands-on projects showcasing responsive design implementation.',
        credentialId: 'FCC-RWD-2025-78901',
        link: '#'
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    currentYear.textContent = new Date().getFullYear();
    
    // Initialize animations
    initAnimations();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize certificate modals
    initCertificateModals();
    
    // Initialize form handling
    initFormHandling();
});

// Animation on Scroll
function initAnimations() {
    const animateElements = document.querySelectorAll('.animate-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Scroll Effects
function initScrollEffects() {
    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
        
        // Header shadow on scroll
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.12)';
        } else {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.08)';
        }
    });
    
    // Back to top click handler
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile Navigation
function initMobileNav() {
    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        navLinks.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close mobile menu
    closeMenu.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!navLinks.contains(e.target) && 
                !menuToggle.contains(e.target) && 
                navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Certificate Modals
function initCertificateModals() {
    const certificationCards = document.querySelectorAll('.certification-card');
    const viewButtons = document.querySelectorAll('.view-certificate');
    
    // Open modal when clicking card
    certificationCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking the view button
            if (e.target.closest('.view-certificate')) {
                return;
            }
            
            const certType = this.getAttribute('data-cert');
            openCertificateModal(certType);
        });
    });
    
    // Open modal when clicking view button
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.certification-card');
            const certType = card.getAttribute('data-cert');
            openCertificateModal(certType);
        });
    });
    
    // Close modal functionality
    closeButtons.forEach(button => {
        button.addEventListener('click', closeCertificateModal);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCertificateModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeCertificateModal();
        }
    });
}

function openCertificateModal(certType) {
    const data = certificateData[certType];
    if (!data) return;
    
    const card = document.querySelector(`[data-cert="${certType}"]`);
    const imageSrc = card.querySelector('img').src;
    
    modalImage.src = imageSrc;
    modalImage.alt = data.title;
    modalTitle.textContent = data.title;
    modalIssuer.textContent = data.issuer;
    modalDate.textContent = data.date;
    modalId.textContent = data.credentialId;
    modalDescription.textContent = data.description;
    modalLink.href = data.link;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertificateModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Form Handling with Web3Forms
function initFormHandling() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Disable submit button and show loading
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Create FormData from the form
            const formData = new FormData(this);
            
            // Add additional hidden fields for Web3Forms
            formData.append('redirect', 'https://web3forms.com/success');
            formData.append('from_name', 'Portfolio Contact Form');
            
            // Send to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                formSuccess.style.display = 'block';
                contactForm.reset();
                
                // Scroll to success message
                formSuccess.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'nearest'
                });
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            } else {
                showFormError('Failed to send message. Please try again later.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showFormError('Network error. Please check your connection and try again.');
        } finally {
            // Re-enable submit button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Add real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateForm() {
    let isValid = true;
    const formInputs = contactForm.querySelectorAll('input[required], textarea[required]');
    
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    clearFieldError(field);
    
    // Check if empty
    if (!field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Show error if invalid
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Create error message element
    let errorElement = field.parentElement.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.color = 'var(--error)';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.5rem';
}

function clearFieldError(field) {
    field.classList.remove('error');
    
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function showFormError(message) {
    // Create or update error element
    let errorElement = contactForm.querySelector('.form-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        contactForm.insertBefore(errorElement, contactForm.firstChild);
    }
    
    errorElement.innerHTML = `
        <div style="
            background: linear-gradient(135deg, var(--error) 0%, #dc2626 100%);
            color: white;
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            text-align: center;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        ">
            <i class="fas fa-exclamation-circle"></i>
            ${message}
        </div>
    `;
    
    // Remove error after 5 seconds
    setTimeout(() => {
        if (errorElement) {
            errorElement.remove();
        }
    }, 5000);
}

// Responsive adjustments for timeline
function adjustTimelineForMobile() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (window.innerWidth <= 768) {
        timelineItems.forEach(item => {
            const yearElement = item.querySelector('.timeline-year');
            if (yearElement) {
                // Adjust year position for mobile
                const content = item.querySelector('.timeline-content h3');
                if (content) {
                    if (content.textContent.includes('Bachelor') || content.textContent.includes('BSc')) {
                        yearElement.textContent = 'Present';
                    } else if (content.textContent.includes('+2')) {
                        yearElement.textContent = '2022-2024';
                    } else if (content.textContent.includes('School') || content.textContent.includes('SEE')) {
                        yearElement.textContent = '2022';
                    }
                }
            }
        });
    }
}

// Initial call for responsive adjustments
adjustTimelineForMobile();

// Update on resize
window.addEventListener('resize', adjustTimelineForMobile);

// Add error styles to CSS
const style = document.createElement('style');
style.textContent = `
    .form-control.error {
        border-color: var(--error) !important;
        background-color: rgba(239, 68, 68, 0.05);
    }
    
    .form-control.error:focus {
        box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1) !important;
    }
`;
document.head.appendChild(style);