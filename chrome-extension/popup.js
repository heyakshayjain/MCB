// Popup script for handling user interactions and data management

document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Load data from background script
    loadUserData();

    // Load settings for auto-fill toggle
    loadSettings();

    // Save button functionality
    document.getElementById('save-btn').addEventListener('click', saveData);

    // Cancel button functionality
    document.getElementById('cancel-btn').addEventListener('click', function() {
        // Reload data to discard changes
        loadUserData();
        loadSettings();
    });

    // Auto-fill toggle functionality
    document.getElementById('auto-fill-toggle').addEventListener('change', function() {
        const settings = { autoFillEnabled: this.checked };
        chrome.runtime.sendMessage({ action: 'storeSettings', settings }, function(response) {
            if (!response.success) {
                console.error('Failed to save settings:', response.error);
            }
        });
    });

    // Options link functionality
    document.getElementById('options-link').addEventListener('click', function(e) {
        e.preventDefault();
        chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
    });
});

// Function to load user data from background script
function loadUserData() {
    const dataTypes = ['personalInfo', 'academicInfo', 'addressInfo'];

    dataTypes.forEach(type => {
        chrome.runtime.sendMessage({ action: 'retrieveData', type }, function(response) {
            if (response.success) {
                populateForm(type, response.data);
            } else {
                console.log('No data found for', type);
            }
        });
    });
}

// Function to populate form fields with data
function populateForm(type, data) {
    const formId = type.replace('Info', '-form');
    const form = document.getElementById(formId);

    if (form) {
        for (const key in data) {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = data[key];
            }
        }
    }
}

// Function to load settings
function loadSettings() {
    chrome.runtime.sendMessage({ action: 'retrieveSettings' }, function(response) {
        if (response.success) {
            const settings = response.data;
            document.getElementById('auto-fill-toggle').checked = settings.autoFillEnabled || false;
        } else {
            console.error('Failed to load settings:', response.error);
        }
    });
}

// Function to save data
function saveData() {
    const dataTypes = [
        { type: 'personalInfo', formId: 'personal-form' },
        { type: 'academicInfo', formId: 'academic-form' },
        { type: 'addressInfo', formId: 'address-form' }
    ];

    dataTypes.forEach(({ type, formId }) => {
        const form = document.getElementById(formId);
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        chrome.runtime.sendMessage({ action: 'storeData', type, data }, function(response) {
            if (response.success) {
                console.log('Data saved successfully for', type);
            } else {
                console.error('Failed to save data for', type, ':', response.error);
            }
        });
    });
}