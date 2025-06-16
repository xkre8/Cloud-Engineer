// Configuration
const CONFIG = {
    emailjsUserId: 'YOUR_EMAILJS_USER_ID', // Replace with your EmailJS User ID
    emailjsServiceId: 'YOUR_EMAILJS_SERVICE_ID', // Replace with your EmailJS Service ID
    emailjsTemplateId: 'YOUR_EMAILJS_TEMPLATE_ID', // Replace with your EmailJS Template ID
    resumeUrl: './assets/Cloud Engineer.pdf' // Path to your PDF resume
};

// Initialize EmailJS (uncomment when you have your EmailJS credentials)
// (function() {
//     emailjs.init(CONFIG.emailjsUserId);
// })();

// Modal Functions
function openContactModal() {
    document.getElementById('contactModal').style.display = 'block';
}

function closeContactModal() {
    document.getElementById('contactModal').style.display = 'none';
    clearForm();
}

function clearForm() {
    document.getElementById('contactForm').reset();
    hideAlerts();
}

// Alert Functions
function showAlert(type, message) {
    hideAlerts();
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.display = 'block';
    
    const form = document.getElementById('contactForm');
    form.insertBefore(alertDiv, form.firstChild);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

function hideAlerts() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => alert.remove());
}

// Resume Download Function
function downloadResume() {
    try {
        // Create temporary link element
        const link = document.createElement('a');
        link.href = CONFIG.resumeUrl;
        link.download = 'Nuntawat_Fangritlong_Resume.pdf';
        link.target = '_blank';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        showAlert('success', 'Resume download started successfully!');
    } catch (error) {
        console.error('Download failed:', error);
        showAlert('error', 'Download failed. Please try again or contact me directly.');
        
        // Fallback: Open in new tab
        window.open(CONFIG.resumeUrl, '_blank');
    }
}

// Form Submission Handler
function handleFormSubmission(formData) {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span>Sending...';
    submitBtn.disabled = true;
    
    // Method 1: Using EmailJS (Recommended)
    if (typeof emailjs !== 'undefined') {
        emailjs.send(
            CONFIG.emailjsServiceId,
            CONFIG.emailjsTemplateId,
            {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message,
                to_email: 'nuntawat.works@gmail.com'
            }
        ).then(
            function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showAlert('success', 'Message sent successfully! I will get back to you soon.');
                clearForm();
                setTimeout(closeContactModal, 2000);
            },
            function(error) {
                console.log('FAILED...', error);
                showAlert('error', 'Failed to send message. Please try the email fallback.');
                fallbackToEmail(formData);
            }
        ).finally(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    } else {
        // Method 2: Fallback to mailto
        setTimeout(() => {
            fallbackToEmail(formData);
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1000);
    }
}

// Fallback Email Method
function fallbackToEmail(formData) {
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n\n` +
        `Message:\n${formData.message}`
    );
    
    const mailtoLink = `mailto:nuntawat.works@gmail.com?subject=${subject}&body=${body}`;
    
    try {
        window.location.href = mailtoLink;
        showAlert('success', 'Email client opened. Please send the email to complete your message.');
        setTimeout(closeContactModal, 3000);
    } catch (error) {
        console.error('Mailto failed:', error);
        showAlert('error', 'Please contact me directly at: nuntawat.works@gmail.com');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showAlert('error', 'Please fill in all fields.');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showAlert('error', 'Please enter a valid email address.');
            return;
        }
        
        handleFormSubmission(formData);
    });
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('contactModal');
        if (event.target === modal) {
            closeContactModal();
        }
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeContactModal();
        }
    });
});

// Smooth scrolling and animation on scroll
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 150;
        
        if (cardTop < window.innerHeight - cardVisible) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});

// Typing effect function
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', function() {
    const title = document.querySelector('.header h1');
    const subtitle = document.querySelector('.header h2');
    
    setTimeout(() => {
        typeWriter(title, 'Nuntawat Fangritlong', 100);
    }, 500);
    
    setTimeout(() => {
        typeWriter(subtitle, 'Cloud Engineer', 80);
    }, 2500);
});

// Alternative contact methods
function openWhatsApp() {
    const phone = '+66809746514';
    const message = 'Hello! I found your portfolio and would like to get in touch.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function openLinkedIn() {
    // Replace with your LinkedIn profile URL
    const linkedInUrl = 'https://linkedin.com/in/nuntawat-fangritlong';
    window.open(linkedInUrl, '_blank');
}

function callDirectly() {
    window.location.href = 'tel:+66809746514';
}

// Utility Functions
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showAlert('success', 'Copied to clipboard!');
    }, function(err) {
        console.error('Could not copy text: ', err);
        showAlert('error', 'Failed to copy to clipboard.');
    });
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(function() {
    // Add any scroll-based functionality here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);