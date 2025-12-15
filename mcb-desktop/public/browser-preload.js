const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    // --- Styles ---
    const style = document.createElement('style');
    style.textContent = `
        #mcb-floating-container {
            position: fixed;
            bottom: 100px;
            right: 20px;
            z-index: 2147483647; /* Max z-index */
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        #mcb-main-button {
            width: 50px;
            height: 50px;
            border-radius: 25px;
            background-color: #8b5cf6;
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        #mcb-main-button:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(139, 92, 246, 0.5);
        }
        #mcb-menu {
            position: absolute;
            bottom: 60px;
            right: 0;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            padding: 8px;
            display: none;
            flex-direction: column;
            gap: 4px;
            width: 160px;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.2s, transform 0.2s;
        }
        #mcb-menu.visible {
            display: flex;
            opacity: 1;
            transform: translateY(0);
        }
        .mcb-menu-item {
            padding: 8px 12px;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            color: #374151;
            font-size: 14px;
            font-weight: 500;
            transition: background-color 0.1s;
        }
        .mcb-menu-item:hover {
            background-color: #f3f4f6;
            color: #111827;
        }
        .mcb-icon {
            width: 18px;
            height: 18px;
        }
    `;
    document.head.appendChild(style);

    // --- DOM Elements ---
    const container = document.createElement('div');
    container.id = 'mcb-floating-container';

    const menu = document.createElement('div');
    menu.id = 'mcb-menu';
    menu.innerHTML = `
        <div class="mcb-menu-item" id="mcb-autofill">
            <svg class="mcb-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #8b5cf6;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Auto-fill
        </div>
        <div class="mcb-menu-item" id="mcb-quick-copy">
            <svg class="mcb-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #3b82f6;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Quick Copy
        </div>
    `;

    const button = document.createElement('div');
    button.id = 'mcb-main-button';
    button.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
    `;

    container.appendChild(menu);
    container.appendChild(button);
    document.body.appendChild(container);

    // --- Logic ---
    let isMenuOpen = false;

    button.onclick = (e) => {
        e.stopPropagation();
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            menu.classList.add('visible');
        } else {
            menu.classList.remove('visible');
        }
    };

    document.addEventListener('click', (e) => {
        if (isMenuOpen && !container.contains(e.target)) {
            isMenuOpen = false;
            menu.classList.remove('visible');
        }
    });

    document.getElementById('mcb-quick-copy').onclick = () => {
        ipcRenderer.send('toggle-sidebar');
        isMenuOpen = false;
        menu.classList.remove('visible');
    };

    document.getElementById('mcb-autofill').onclick = async () => {
        isMenuOpen = false;
        menu.classList.remove('visible');

        // Fetch data
        const data = await ipcRenderer.invoke('get-profile-data');
        if (!data) return;

        // Simple heuristic autofill
        const inputs = document.querySelectorAll('input, textarea, select');
        let filledCount = 0;

        inputs.forEach(input => {
            if (input.type === 'hidden' || input.type === 'submit' || input.type === 'button') return;
            if (input.value && input.value.length > 0) return; // Don't overwrite

            const name = (input.name || input.id || '').toLowerCase();
            const label = input.labels?.[0]?.innerText?.toLowerCase() || '';
            const context = name + ' ' + label;

            let valueToFill = null;

            // Personal Info
            if (context.includes('email')) valueToFill = data.personalInfo.email;
            else if (context.includes('first') && context.includes('name')) valueToFill = data.personalInfo.firstName;
            else if (context.includes('last') && context.includes('name')) valueToFill = data.personalInfo.lastName;
            else if (context.includes('full') && context.includes('name')) valueToFill = data.personalInfo.fullName;
            else if (context.includes('name')) valueToFill = data.personalInfo.fullName; // Fallback
            else if (context.includes('phone') || context.includes('mobile')) valueToFill = data.personalInfo.phone;
            else if (context.includes('address')) valueToFill = data.personalInfo.address;
            else if (context.includes('birth') || context.includes('dob')) valueToFill = data.personalInfo.dob;

            // Academic Info
            else if (context.includes('gpa')) valueToFill = data.academicInfo.gpa;
            else if (context.includes('sat')) valueToFill = data.academicInfo.sat;
            else if (context.includes('act')) valueToFill = data.academicInfo.act;
            else if (context.includes('school')) valueToFill = data.academicInfo.school;
            else if (context.includes('grad') && context.includes('year')) valueToFill = data.academicInfo.gradYear;

            if (valueToFill) {
                input.value = valueToFill;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
                input.style.backgroundColor = '#e0f2fe'; // Light blue highlight
                filledCount++;
            }
        });

        if (filledCount > 0) {
            alert(`Auto-filled ${filledCount} fields!`);
        } else {
            alert('No matching fields found to auto-fill.');
        }
    };
});
