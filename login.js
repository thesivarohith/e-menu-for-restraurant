// Login Page Functionality

// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const rememberMeCheckbox = document.getElementById('rememberMe');
const appleSignInBtn = document.getElementById('appleSignIn');
const googleSignInBtn = document.getElementById('googleSignIn');

// Password Toggle Functionality
let passwordVisible = false;

togglePasswordBtn.addEventListener('click', () => {
    passwordVisible = !passwordVisible;

    if (passwordVisible) {
        passwordInput.type = 'text';
        togglePasswordBtn.querySelector('.material-icons').textContent = 'visibility';
    } else {
        passwordInput.type = 'password';
        togglePasswordBtn.querySelector('.material-icons').textContent = 'visibility_off';
    }

    // Add animation
    togglePasswordBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        togglePasswordBtn.style.transform = 'scale(1)';
    }, 100);
});

// Form Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Add real-time validation feedback
emailInput.addEventListener('blur', () => {
    if (emailInput.value && !isValidEmail(emailInput.value)) {
        emailInput.style.borderColor = '#ff4444';
        showInputError(emailInput, 'Please enter a valid email address');
    } else {
        emailInput.style.borderColor = '';
        removeInputError(emailInput);
    }
});

passwordInput.addEventListener('blur', () => {
    if (passwordInput.value && !validatePassword(passwordInput.value)) {
        passwordInput.style.borderColor = '#ff4444';
        showInputError(passwordInput, 'Password must be at least 6 characters');
    } else {
        passwordInput.style.borderColor = '';
        removeInputError(passwordInput);
    }
});

function showInputError(input, message) {
    removeInputError(input);

    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.style.cssText = `
        color: #ff4444;
        font-size: 12px;
        margin-top: 4px;
        animation: fadeIn 0.2s ease;
    `;
    errorDiv.textContent = message;

    input.parentElement.appendChild(errorDiv);
}

function removeInputError(input) {
    const existingError = input.parentElement.querySelector('.input-error');
    if (existingError) {
        existingError.remove();
    }
}

// Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox.checked;

    // Validate inputs
    let isValid = true;

    if (!isValidEmail(email)) {
        showInputError(emailInput, 'Please enter a valid email address');
        emailInput.style.borderColor = '#ff4444';
        isValid = false;
    }

    if (!validatePassword(password)) {
        showInputError(passwordInput, 'Password must be at least 6 characters');
        passwordInput.style.borderColor = '#ff4444';
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Show loading state
    const submitBtn = loginForm.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>SIGNING IN...</span>';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Simulate API call
    setTimeout(() => {
        console.log('Login attempt:', { email, rememberMe });

        // Here you would typically send credentials to your backend
        // For demo purposes, show success
        showSuccessMessage(email);

        // Reset button after delay
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }, 2000);
    }, 1500);
});

// Success Message
function showSuccessMessage(email) {
    const formContainer = document.querySelector('.form-container');

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
            <div style="font-weight: 600;">Welcome back!</div>
            <div style="font-size: 13px; opacity: 0.9;">Signed in as ${email}</div>
        </div>
    `;

    document.body.appendChild(successDiv);

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Remove after 3 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 3000);
}

// Social Sign-In Handlers
appleSignInBtn.addEventListener('click', () => {
    console.log('Apple sign-in clicked');
    // Implement Apple OAuth flow
    alert('Apple sign-in would be implemented here with OAuth 2.0');
});

googleSignInBtn.addEventListener('click', () => {
    console.log('Google sign-in clicked');
    // Implement Google OAuth flow
    alert('Google sign-in would be implemented here with OAuth 2.0');
});

// Input Focus Animations
const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.005)';
        input.parentElement.style.transition = 'transform 0.2s ease';
    });

    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

// Remember Me - Load from localStorage
window.addEventListener('load', () => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
        rememberMeCheckbox.checked = true;
    }
});

// Save email if Remember Me is checked
rememberMeCheckbox.addEventListener('change', () => {
    if (!rememberMeCheckbox.checked) {
        localStorage.removeItem('rememberedEmail');
    }
});

loginForm.addEventListener('submit', () => {
    if (rememberMeCheckbox.checked) {
        localStorage.setItem('rememberedEmail', emailInput.value);
    }
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to submit
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

// Prevent multiple rapid submissions
let isSubmitting = false;

loginForm.addEventListener('submit', (e) => {
    if (isSubmitting) {
        e.preventDefault();
        return;
    }
    isSubmitting = true;

    setTimeout(() => {
        isSubmitting = false;
    }, 2000);
});
