// Content script for form detection on exam sites

// Site-specific field mappings
const fieldMappings = {
  'bitsadmission.com': {
    name: ['input[name*="name"]', 'input[placeholder*="name"]', 'input[id*="name"]'],
    email: ['input[type="email"]', 'input[name*="email"]', 'input[placeholder*="email"]'],
    phone: ['input[name*="phone"]', 'input[name*="mobile"]', 'input[placeholder*="phone"]'],
    dob: ['input[name*="dob"]', 'input[name*="birth"]', 'input[placeholder*="date"]'],
    category: ['select[name*="category"]', 'input[name*="category"]'],
    school: ['input[name*="school"]', 'input[placeholder*="school"]'],
    board: ['select[name*="board"]', 'input[name*="board"]'],
    year: ['select[name*="year"]', 'input[name*="year"]'],
    percentage: ['input[name*="percentage"]', 'input[name*="marks"]'],
    address: ['textarea[name*="address"]', 'input[name*="address"]'],
    city: ['input[name*="city"]', 'input[placeholder*="city"]'],
    state: ['select[name*="state"]', 'input[name*="state"]'],
    pin: ['input[name*="pin"]', 'input[name*="zip"]']
  },
  'jeemain.nta.nic.in': {
    name: ['input[name*="candidateName"]', 'input[placeholder*="name"]'],
    email: ['input[name*="email"]', 'input[type="email"]'],
    phone: ['input[name*="mobile"]', 'input[name*="phone"]'],
    dob: ['input[name*="dob"]', 'input[type="date"]'],
    category: ['select[name*="category"]', 'input[name*="category"]'],
    school: ['input[name*="schoolName"]', 'input[placeholder*="school"]'],
    board: ['select[name*="board"]', 'input[name*="board"]'],
    year: ['select[name*="yearOfPassing"]', 'input[name*="year"]'],
    percentage: ['input[name*="percentage"]', 'input[name*="marks"]'],
    address: ['textarea[name*="address"]', 'input[name*="address"]'],
    city: ['input[name*="city"]', 'input[placeholder*="city"]'],
    state: ['select[name*="state"]', 'input[name*="state"]'],
    pin: ['input[name*="pincode"]', 'input[name*="pin"]']
  }
};

// Function to detect form fields
function detectFormFields() {
  const hostname = window.location.hostname;
  const mappings = fieldMappings[hostname];
  if (!mappings) return {};

  const detectedFields = {};
  for (const [field, selectors] of Object.entries(mappings)) {
    for (const selector of selectors) {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        detectedFields[field] = Array.from(elements);
        break; // Use first matching selector
      }
    }
  }
  return detectedFields;
}

// Function to inject floating panel
function injectFloatingPanel() {
  const panel = document.createElement('div');
  panel.id = 'form-detection-panel';
  panel.innerHTML = `
    <div id="panel-header">Form Detection Active</div>
    <div id="panel-content">
      <p>Detected fields will be listed here.</p>
    </div>
  `;
  document.body.appendChild(panel);
}

// Function to update panel with detected fields
function updatePanel(fields) {
  const content = document.getElementById('panel-content');
  if (content) {
    content.innerHTML = '<ul>' + Object.keys(fields).map(field => `<li>${field}: ${fields[field].length} fields</li>`).join('') + '</ul>';
  }
}

// Mutation observer for dynamic changes
const observer = new MutationObserver(() => {
  const fields = detectFormFields();
  updatePanel(fields);
});

// Function to add event listeners to fields
function addFieldListeners(fields) {
  for (const [fieldName, elements] of Object.entries(fields)) {
    elements.forEach(el => {
      el.addEventListener('input', () => {
        console.log(`${fieldName} changed:`, el.value);
      });
    });
  }
}

// Communication with background script
function requestUserData() {
  chrome.runtime.sendMessage({ action: 'getUserData' }, (response) => {
    console.log('User data received:', response);
  });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  const hostname = window.location.hostname;
  if (hostname === 'bitsadmission.com' || hostname === 'jeemain.nta.nic.in') {
    const fields = detectFormFields();
    injectFloatingPanel();
    updatePanel(fields);
    addFieldListeners(fields);
    requestUserData();

    // Start observing mutations
    observer.observe(document.body, { childList: true, subtree: true });
  }
});