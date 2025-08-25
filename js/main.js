// Utility Functions
function openContact() {
    document.getElementById('contactModal').style.display = 'block';
}

function downloadResume() {
    const link = document.createElement('a');
    link.href = 'assets/Cloud Engineer.pdf';
    link.download = 'Nuntawat_Fangritlong_Senior_Cloud_Engineer_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    animateOnScroll();

    // Initialize floating effects
    createFloatingEffect();

    // Scroll listener for animations
    window.addEventListener('scroll', animateOnScroll);
});

// Particle Animation for Cloud Components
function createFloatingEffect() {
    const components = document.querySelectorAll('.cloud-component');
    components.forEach((component, index) => {
        const delay = index * 0.5;
        component.style.animationDelay = delay + 's';
    });
}

// Initialize floating effects on window load
window.addEventListener('load', createFloatingEffect);