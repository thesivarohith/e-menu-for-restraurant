// Signup Page Functionality

// DOM Elements
const signupForm = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');

// Password Toggle Functionality
let passwordVisible = false;

togglePasswordBtn.addEventListener('click', () => {
    passwordVisible = !passwordVisible;
    const offLine = togglePasswordBtn.querySelector('.eye-off-line');

    if (passwordVisible) {
        passwordInput.type = 'text';
        if (offLine) offLine.style.display = 'none';
    } else {
        passwordInput.type = 'password';
        if (offLine) offLine.style.display = 'block';
    }

    // Add animation
    togglePasswordBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        togglePasswordBtn.style.transform = 'scale(1)';
    }, 100);
});

// Form Submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Show loading state
    const submitBtn = signupForm.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>JOINING...</span>';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Simulate API call
    setTimeout(() => {
        console.log('Signup attempt:', { name, email });
        showSuccessMessage(name);

        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }, 2000);
    }, 1500);
});

// Success Message
function showSuccessMessage(name) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(76, 175, 80, 0.95);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 12px;
        animation: slideInRight 0.3s ease;
        z-index: 1000;
    `;

    successDiv.innerHTML = `
        <span class="material-icons">check_circle</span>
        <div>
            <div style="font-weight: 600;">Welcome to the Club!</div>
            <div style="font-size: 13px; opacity: 0.9;">Your account is ready, ${name}.</div>
        </div>
    `;

    document.body.appendChild(successDiv);

    // Add animation styles if not present
    if (!document.getElementById('success-anim-styles')) {
        const style = document.createElement('style');
        style.id = 'success-anim-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 3000);
}
