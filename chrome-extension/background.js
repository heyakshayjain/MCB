// Background script for secure data storage using Chrome Storage API

let encryptionKey;

async function initializeKey() {
  try {
    encryptionKey = await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
  } catch (error) {
    console.error('Failed to initialize encryption key:', error);
  }
}

initializeKey();

// Encryption function using Web Crypto API
async function encryptData(data) {
  try {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      encryptionKey,
      new TextEncoder().encode(JSON.stringify(data))
    );
    return { encrypted: Array.from(new Uint8Array(encrypted)), iv: Array.from(iv) };
  } catch (error) {
    throw new Error('Encryption failed: ' + error.message);
  }
}

// Decryption function using Web Crypto API
async function decryptData(encryptedObj) {
  try {
    const iv = new Uint8Array(encryptedObj.iv);
    const encrypted = new Uint8Array(encryptedObj.encrypted);
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      encryptionKey,
      encrypted
    );
    return JSON.parse(new TextDecoder().decode(decrypted));
  } catch (error) {
    throw new Error('Decryption failed: ' + error.message);
  }
}

// Store user data with encryption
async function storeUserData(type, data) {
  try {
    if (!['personalInfo', 'academicInfo', 'addressInfo'].includes(type)) {
      throw new Error('Invalid data type. Must be personalInfo, academicInfo, or addressInfo.');
    }
    if (typeof data !== 'object' || data === null) {
      throw new Error('Data must be a non-null object.');
    }
    const encrypted = await encryptData(data);
    await chrome.storage.sync.set({ [type]: encrypted });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Retrieve user data with decryption
async function retrieveUserData(type) {
  try {
    if (!['personalInfo', 'academicInfo', 'addressInfo'].includes(type)) {
      throw new Error('Invalid data type. Must be personalInfo, academicInfo, or addressInfo.');
    }
    const result = await chrome.storage.sync.get(type);
    if (!result[type]) {
      return { success: false, error: 'No data found for the specified type.' };
    }
    const data = await decryptData(result[type]);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Store settings
async function storeSettings(settings) {
  try {
    if (typeof settings !== 'object' || settings === null) {
      throw new Error('Settings must be a non-null object.');
    }
    // Basic validation for known settings
    const validKeys = ['autoFillEnabled', 'encryptData', 'allowedSites'];
    for (const key in settings) {
      if (!validKeys.includes(key)) {
        throw new Error(`Invalid setting key: ${key}`);
      }
    }
    await chrome.storage.sync.set({ settings });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Retrieve settings
async function retrieveSettings() {
  try {
    const result = await chrome.storage.sync.get('settings');
    return { success: true, data: result.settings || {} };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Message handling for communication with content script and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  (async () => {
    try {
      if (message.action === 'storeData') {
        const result = await storeUserData(message.type, message.data);
        sendResponse(result);
      } else if (message.action === 'retrieveData') {
        const result = await retrieveUserData(message.type);
        sendResponse(result);
      } else if (message.action === 'storeSettings') {
        const result = await storeSettings(message.settings);
        sendResponse(result);
      } else if (message.action === 'retrieveSettings') {
        const result = await retrieveSettings();
        sendResponse(result);
      } else {
        sendResponse({ success: false, error: 'Unknown action.' });
      }
    } catch (error) {
      sendResponse({ success: false, error: 'Internal error: ' + error.message });
    }
  })();
  return true; // Keep the message channel open for async response
});

console.log('Background script loaded with secure data storage functionality');