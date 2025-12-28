// Digitali - Asset-Backed Lending Platform
// Interactive functionality for customer and admin views

// ============================================
// VIEW MANAGEMENT
// ============================================

const customerViewBtn = document.getElementById('customerViewBtn');
const adminViewBtn = document.getElementById('adminViewBtn');
const customerView = document.getElementById('customer-view');
const adminView = document.getElementById('admin-view');

// Toggle between customer and admin views
customerViewBtn.addEventListener('click', () => {
    customerView.classList.add('active');
    adminView.classList.remove('active');
    customerViewBtn.classList.add('active');
    adminViewBtn.classList.remove('active');
});

adminViewBtn.addEventListener('click', () => {
    adminView.classList.add('active');
    customerView.classList.remove('active');
    adminViewBtn.classList.add('active');
    customerViewBtn.classList.remove('active');
});

// ============================================
// CUSTOMER VIEW - ONBOARDING FLOW
// ============================================

const getStartedBtn = document.getElementById('getStartedBtn');
const onboardingSection = document.getElementById('onboardingSection');
const heroSection = document.querySelector('.hero');

// Start onboarding process
getStartedBtn.addEventListener('click', () => {
    heroSection.style.display = 'none';
    onboardingSection.classList.remove('hidden');
});

// Asset type selection
const assetTypeCards = document.querySelectorAll('.asset-type-card');
let selectedAssetType = null;

assetTypeCards.forEach(card => {
    card.addEventListener('click', () => {
        assetTypeCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedAssetType = card.dataset.type;
    });
});

// Step navigation
const continueToFeeBtn = document.getElementById('continueToFeeBtn');
const assetValueInput = document.getElementById('assetValue');

continueToFeeBtn.addEventListener('click', () => {
    if (!selectedAssetType) {
        alert('Please select an asset type');
        return;
    }

    if (!assetValueInput.value || assetValueInput.value <= 0) {
        alert('Please enter a valid asset value');
        return;
    }

    // Move to step 2
    showStep(2);
    calculateFee();
});

function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(step => {
        step.classList.remove('active');
    });

    // Show selected step
    document.getElementById(`step${stepNumber}`).classList.add('active');

    // Update progress bar
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < stepNumber) {
            step.classList.add('completed');
        } else if (index + 1 === stepNumber) {
            step.classList.add('active');
        }
    });
}

// Fee calculation
function calculateFee() {
    const assetValue = parseFloat(assetValueInput.value);
    const feeRates = {
        'logbook': 2.5,
        'title-deed': 2.0,
        'electronics': 3.0
    };

    const feeRate = feeRates[selectedAssetType] || 2.5;
    const chargeFee = assetValue * (feeRate / 100);

    // Update display
    document.getElementById('displayAssetValue').textContent = `KES ${assetValue.toLocaleString()}`;
    document.getElementById('displayChargeRate').textContent = `${feeRate}%`;
    document.getElementById('displayChargeFee').textContent = `KES ${chargeFee.toLocaleString()}`;
}

// M-Pesa payment
const payViaMpesaBtn = document.getElementById('payViaMpesaBtn');
const mpesaPhoneInput = document.getElementById('mpesaPhone');
const paymentStatus = document.getElementById('paymentStatus');

payViaMpesaBtn.addEventListener('click', () => {
    const phoneNumber = mpesaPhoneInput.value;

    if (!phoneNumber || phoneNumber.length < 10) {
        alert('Please enter a valid M-Pesa phone number');
        return;
    }

    // Show payment status
    paymentStatus.classList.remove('hidden');
    payViaMpesaBtn.disabled = true;
    payViaMpesaBtn.style.opacity = '0.5';

    // Simulate M-Pesa STK push and callback
    setTimeout(() => {
        paymentStatus.innerHTML = `
            <div class="status-icon">✓</div>
            <p class="status-text">Payment confirmed! Processing your application...</p>
        `;

        // Move to step 3 after confirmation
        setTimeout(() => {
            showStep(3);
        }, 2000);
    }, 3000);
});

// ============================================
// ADMIN VIEW - NAVIGATION
// ============================================

const navItems = document.querySelectorAll('.nav-item');
const adminSections = document.querySelectorAll('.admin-section');
const pageTitle = document.getElementById('pageTitle');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        // Update active nav item
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Show corresponding section
        const sectionName = item.dataset.section;
        adminSections.forEach(section => section.classList.remove('active'));
        document.getElementById(`${sectionName}Section`).classList.add('active');

        // Update page title
        const titles = {
            'dashboard': 'Dashboard',
            'rates': 'Rate Controller',
            'fees': 'Fee Logic Engine',
            'transactions': 'Transaction Ledger'
        };
        pageTitle.textContent = titles[sectionName];
    });
});

// ============================================
// ADMIN VIEW - RATE CONTROLLER
// ============================================

// Logbook rates
const logbookAnnualSlider = document.getElementById('logbookAnnual');
const logbookMonthlySlider = document.getElementById('logbookMonthly');
const logbookAnnualValue = document.getElementById('logbookAnnualValue');
const logbookMonthlyValue = document.getElementById('logbookMonthlyValue');

logbookAnnualSlider.addEventListener('input', (e) => {
    logbookAnnualValue.textContent = e.target.value;
});

logbookMonthlySlider.addEventListener('input', (e) => {
    logbookMonthlyValue.textContent = parseFloat(e.target.value).toFixed(1);
});

// Title Deed rates
const titleAnnualSlider = document.getElementById('titleAnnual');
const titleMonthlySlider = document.getElementById('titleMonthly');
const titleAnnualValue = document.getElementById('titleAnnualValue');
const titleMonthlyValue = document.getElementById('titleMonthlyValue');

titleAnnualSlider.addEventListener('input', (e) => {
    titleAnnualValue.textContent = e.target.value;
});

titleMonthlySlider.addEventListener('input', (e) => {
    titleMonthlyValue.textContent = parseFloat(e.target.value).toFixed(1);
});

// Electronics rates
const electronicsAnnualSlider = document.getElementById('electronicsAnnual');
const electronicsMonthlySlider = document.getElementById('electronicsMonthly');
const electronicsAnnualValue = document.getElementById('electronicsAnnualValue');
const electronicsMonthlyValue = document.getElementById('electronicsMonthlyValue');

electronicsAnnualSlider.addEventListener('input', (e) => {
    electronicsAnnualValue.textContent = e.target.value;
});

electronicsMonthlySlider.addEventListener('input', (e) => {
    electronicsMonthlyValue.textContent = parseFloat(e.target.value).toFixed(1);
});

// Save rate changes
const saveBtns = document.querySelectorAll('.btn-save');
saveBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Show success feedback
        const originalText = btn.textContent;
        btn.textContent = '✓ Saved!';
        btn.style.background = '#10B981';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 2000);
    });
});

// ============================================
// ADMIN VIEW - FEE CALCULATOR
// ============================================

const calcAssetValue = document.getElementById('calcAssetValue');
const calcFeeRate = document.getElementById('calcFeeRate');
const calcResult = document.getElementById('calcResult');

function updateCalculator() {
    const assetValue = parseFloat(calcAssetValue.value) || 0;
    const feeRate = parseFloat(calcFeeRate.value) || 0;
    const fee = assetValue * (feeRate / 100);

    calcResult.textContent = `KES ${fee.toLocaleString()}`;
}

calcAssetValue.addEventListener('input', updateCalculator);
calcFeeRate.addEventListener('input', updateCalculator);

// ============================================
// ANIMATIONS & INTERACTIONS
// ============================================

// Add hover effects to stat cards
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Upload zone interaction
const uploadZone = document.getElementById('uploadZone');
if (uploadZone) {
    uploadZone.addEventListener('click', () => {
        alert('File upload functionality would be implemented here with actual backend integration');
    });

    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = '#FFB800';
        uploadZone.style.background = 'rgba(255, 184, 0, 0.05)';
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.style.borderColor = '';
        uploadZone.style.background = '';
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.style.borderColor = '';
        uploadZone.style.background = '';
        alert('Files dropped! Would be processed with backend integration');
    });
}

// ============================================
// REAL-TIME UPDATES SIMULATION
// ============================================

// Simulate real-time transaction updates
function simulateRealTimeUpdates() {
    const transactionCount = document.querySelector('.stat-card:nth-child(1) .stat-value');
    if (transactionCount) {
        setInterval(() => {
            // Randomly update transaction count (demo purposes)
            const currentValue = parseInt(transactionCount.textContent.replace(/,/g, ''));
            const newValue = currentValue + Math.floor(Math.random() * 3);
            transactionCount.textContent = newValue.toLocaleString();
        }, 30000); // Update every 30 seconds
    }
}

// Initialize real-time updates when admin view is active
if (adminView.classList.contains('active')) {
    simulateRealTimeUpdates();
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format currency
function formatCurrency(amount) {
    return `KES ${amount.toLocaleString()}`;
}

// Validate phone number
function validatePhoneNumber(phone) {
    const phoneRegex = /^254[0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
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

console.log('Digitali Platform Initialized ✓');
