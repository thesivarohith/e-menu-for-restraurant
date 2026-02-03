// Newsletter Popup Functionality

// DOM Elements
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');
const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const appleBtn = document.getElementById('appleBtn');
const googleBtn = document.getElementById('googleBtn');

// Close popup function
function closePopup() {
    overlay.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Event Listeners
closeBtn.addEventListener('click', closePopup);

// Close on overlay click (outside popup)
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        closePopup();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// Form submission
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    if (email && isValidEmail(email)) {
        // Show success message
        showSuccessMessage(email);

        // Here you would typically send the email to your backend
        console.log('Email submitted:', email);

        // Close popup after delay
        setTimeout(() => {
            closePopup();
        }, 2000);
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Success message
function showSuccessMessage(email) {
    const contentWrapper = document.querySelector('.content-wrapper');

    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="text-align: center; animation: fadeInUp 0.4s ease;">
            <span class="material-icons" style="font-size: 48px; color: #4CAF50; margin-bottom: 16px;">check_circle</span>
            <h2 style="color: #FFFFFF; font-size: 24px; margin-bottom: 8px;">Welcome!</h2>
            <p style="color: #A0A0A0; font-size: 14px;">Check your inbox at <strong style="color: #FFFFFF;">${email}</strong></p>
            <p style="color: #A0A0A0; font-size: 14px; margin-top: 8px;">Your 10% discount code is on its way!</p>
        </div>
    `;

    // Replace content
    contentWrapper.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        contentWrapper.innerHTML = '';
        contentWrapper.appendChild(successDiv);
        contentWrapper.style.animation = 'fadeIn 0.3s ease';
    }, 300);
}

// Social login handlers
appleBtn.addEventListener('click', () => {
    console.log('Apple login clicked');
    // Implement Apple OAuth flow
    alert('Apple login would be implemented here');
});

googleBtn.addEventListener('click', () => {
    console.log('Google login clicked');
    // Implement Google OAuth flow
    alert('Google login would be implemented here');
});

// Add input animation on focus
emailInput.addEventListener('focus', () => {
    emailInput.parentElement.style.transform = 'scale(1.01)';
});

emailInput.addEventListener('blur', () => {
    emailInput.parentElement.style.transform = 'scale(1)';
});

// Prevent form submission on Enter in email field (already handled by form submit)
emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        newsletterForm.dispatchEvent(new Event('submit'));
    }
});

// Auto-show popup on page load (you can customize this behavior)
window.addEventListener('load', () => {
    // Show popup immediately
    overlay.style.display = 'flex';

    // Or show after delay:
    // setTimeout(() => {
    //     overlay.style.display = 'flex';
    // }, 2000);
});

// Track user interaction
let hasInteracted = false;

document.addEventListener('mousemove', () => {
    if (!hasInteracted) {
        hasInteracted = true;
        console.log('User has interacted with the page');
    }
});
