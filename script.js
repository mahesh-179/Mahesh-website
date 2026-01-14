// Current year for footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle - FIXED
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const closeMenu = document.getElementById('closeMenu');

menuToggle.addEventListener('click', () => {
    navLinks.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
    navLinks.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Back to top button - FIXED
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links - FIXED
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll - FIXED
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight * 0.8;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
}

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', () => {
    animateOnScroll();
});

// Form submission - FIXED
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show success message
        formSuccess.classList.add('show');
        
        // Reset form after 3 seconds
        setTimeout(() => {
            this.reset();
            formSuccess.classList.remove('show');
        }, 3000);
        
        // In a real application, you would send the data to a server here
        console.log('Form submitted:', { name, email, subject, message });
    });
}

// Certificate Modal Functionality - FIXED
const certificationCards = document.querySelectorAll('.certification-card');
const modal = document.getElementById('certificateModal');
const modalImage = document.getElementById('modalCertificateImage');
const modalTitle = document.getElementById('modalCertificateTitle');
const modalIssuer = document.getElementById('modalCertificateIssuer');
const modalDate = document.getElementById('modalCertificateDate');
const modalId = document.getElementById('modalCertificateId');
const modalDescription = document.getElementById('modalCertificateDescription');
const modalLink = document.getElementById('modalCertificateLink');
const closeButtons = document.querySelectorAll('.close-modal');

// Certificate data
const certificateData = {
    'python': {
        title: 'Python Programming Certification',
        issuer: 'Great Learning',
        date: 'May 2023',
        description: 'Comprehensive certification covering Python fundamentals, data structures, and object-oriented programming concepts. This certification validates expertise in Python programming language.',
        credentialId: 'GL-PYTHON-2023-05789'
    },
    'web': {
        title: 'Web Development Fundamentals',
        issuer: 'The Digital Adda',
        date: 'March 2023',
        description: 'Certification covering HTML5, CSS3, JavaScript, and responsive design principles. Demonstrates proficiency in modern web development techniques.',
        credentialId: 'TDA-WEB-2023-03421'
    },
    'responsive': {
        title: 'Responsive Web Design',
        issuer: 'FreeCodeCamp',
        date: 'May 7, 2025',
        description: 'Certification demonstrating proficiency in HTML, CSS, and JavaScript for responsive web development. Includes projects showcasing responsive design implementation.',
        credentialId: 'FCC-RWD-2025-78901'
    }
};

certificationCards.forEach(card => {
    card.addEventListener('click', function() {
        const certType = this.getAttribute('data-cert');
        const data = certificateData[certType];
        
        if (data) {
            modalImage.src = this.querySelector('img').src;
            modalTitle.textContent = data.title;
            modalIssuer.textContent = data.issuer;
            modalDate.textContent = data.date;
            modalDescription.textContent = data.description;
            modalId.textContent = data.credentialId;
            modalLink.href = "#";
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal functionality
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
});

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Prevent form buttons from submitting the page
document.querySelectorAll('.certification-card .btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});