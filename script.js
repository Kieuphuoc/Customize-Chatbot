/* ===================================
   CUSTOM CHATBOT BUILDER - JAVASCRIPT
   Real-time Preview & Interactions
   =================================== */

// ============================================
// MODULE SWITCHING
// ============================================

const navItems = document.querySelectorAll('.nav-item');
const moduleContents = document.querySelectorAll('.module-content');
const moduleTitle = document.getElementById('module-title');
const moduleDescription = document.getElementById('module-description');

// Module metadata
const moduleData = {
    files: {
        title: 'Tải lên Files',
        description: 'Chatbot sẽ học nội dung từ các file này'
    },
    text: {
        title: 'Nhập Văn bản',
        description: 'Nhập nội dung bạn muốn chatbot học từ văn bản'
    },
    website: {
        title: 'Kết nối Website',
        description: 'Hệ thống sẽ quét và học nội dung từ website'
    },
    qa: {
        title: 'Câu hỏi & Trả lời',
        description: 'Tạo các cặp câu hỏi và câu trả lời có sẵn cho chatbot'
    },
    notion: {
        title: 'Kết nối Notion',
        description: 'Kết nối và lấy nội dung từ Notion'
    }
};

// Switch between modules
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const moduleName = item.getAttribute('data-module');

        // Update active state
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        // Show corresponding content
        moduleContents.forEach(content => content.classList.remove('active'));
        document.getElementById(`${moduleName}-module`).classList.add('active');

        // Update header
        moduleTitle.textContent = moduleData[moduleName].title;
        moduleDescription.textContent = moduleData[moduleName].description;
    });
});

// ============================================
// FILE UPLOAD FUNCTIONALITY
// ============================================

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const uploadedFiles = [];

// Trigger file input
dropZone.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-upload') || e.target.closest('.btn-upload')) {
        fileInput.click();
    }
});

// Handle file selection
fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

// Drag and drop handlers
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    handleFiles(e.dataTransfer.files);
});

// Handle uploaded files
function handleFiles(files) {
    Array.from(files).forEach(file => {
        // Check file type
        const validTypes = ['.pdf', '.docx', '.txt', '.csv'];
        const fileExt = '.' + file.name.split('.').pop().toLowerCase();

        if (!validTypes.includes(fileExt)) {
            alert(`File ${file.name} không được hỗ trợ. Chỉ chấp nhận: PDF, DOCX, TXT, CSV`);
            return;
        }

        // Add to uploaded files
        uploadedFiles.push({
            name: file.name,
            size: file.size,
            type: fileExt
        });

        renderFileList();
    });
}

// Render file list
function renderFileList() {
    if (uploadedFiles.length === 0) {
        fileList.innerHTML = '';
        return;
    }

    fileList.innerHTML = uploadedFiles.map((file, index) => `
        <div class="file-item">
            <div class="file-icon">${getFileIcon(file.type)}</div>
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-size">${formatFileSize(file.size)}</div>
            </div>
            <button class="file-remove" onclick="removeFile(${index})">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    `).join('');
}

// Get file icon
function getFileIcon(type) {
    const icons = {
        '.pdf': 'PDF',
        '.docx': 'DOC',
        '.txt': 'TXT',
        '.csv': 'CSV'
    };
    return icons[type] || 'FILE';
}

// Format file size
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Remove file
function removeFile(index) {
    uploadedFiles.splice(index, 1);
    renderFileList();
}

// ============================================
// Q&A MODULE - ADD QUESTION
// ============================================

const addQaBtn = document.getElementById('addQaBtn');
const qaList = document.getElementById('qaList');

addQaBtn.addEventListener('click', () => {
    const newQaPair = document.createElement('div');
    newQaPair.className = 'qa-pair';
    newQaPair.innerHTML = `
        <div class="form-group">
            <label>Câu hỏi</label>
            <input type="text" class="input-field" placeholder="Nhập câu hỏi...">
        </div>
        <div class="form-group">
            <label>Câu trả lời</label>
            <textarea class="input-field" rows="3" placeholder="Nhập câu trả lời..."></textarea>
        </div>
    `;
    qaList.appendChild(newQaPair);

    // Smooth scroll to new item
    newQaPair.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// ============================================
// CHATBOT CONFIGURATION - REAL-TIME PREVIEW
// ============================================

// Chatbot name update
const chatbotNameInput = document.getElementById('chatbotName');
const previewName = document.getElementById('previewName');
const botNameInMessage = document.getElementById('botNameInMessage');

chatbotNameInput.addEventListener('input', (e) => {
    const name = e.target.value || 'Trợ lý AI';
    previewName.textContent = name;
    botNameInMessage.textContent = name;
});

// Chatbot personality update
const chatbotPersonality = document.getElementById('chatbotPersonality');

chatbotPersonality.addEventListener('change', (e) => {
    const personality = e.target.value;
    console.log('Personality changed to:', personality);
    // In a real app, this would affect the chatbot's response style
});

// Custom prompt update
const customPrompt = document.getElementById('customPrompt');

customPrompt.addEventListener('input', (e) => {
    console.log('Custom prompt:', e.target.value);
    // In a real app, this would be sent to the AI model
});

// ============================================
// APPEARANCE CUSTOMIZATION
// ============================================

// Icon upload
const iconInput = document.getElementById('iconInput');
const iconPreview = document.getElementById('iconPreview');
const previewAvatar = document.getElementById('previewAvatar');
const btnUploadIcon = document.querySelector('.btn-upload-icon');

btnUploadIcon.addEventListener('click', () => {
    iconInput.click();
});

iconInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const imgElement = `<img src="${event.target.result}" alt="Chatbot icon">`;
            iconPreview.innerHTML = imgElement;
            previewAvatar.innerHTML = imgElement;
        };
        reader.readAsDataURL(file);
    }
});

// Color pickers - User message color
const userMessageColor = document.getElementById('userMessageColor');
const userColorHex = document.getElementById('userColorHex');
const userMessages = document.querySelectorAll('.message-content.user');

// Sync color picker with hex input
userMessageColor.addEventListener('input', (e) => {
    const color = e.target.value;
    userColorHex.value = color;
    updateUserMessageColor(color);
});

userColorHex.addEventListener('input', (e) => {
    let color = e.target.value;
    if (!color.startsWith('#')) color = '#' + color;
    if (/^#[0-9A-F]{6}$/i.test(color)) {
        userMessageColor.value = color;
        updateUserMessageColor(color);
    }
});

function updateUserMessageColor(color) {
    userMessages.forEach(msg => {
        msg.style.background = color;
    });
}

// Color pickers - Bot message color
const botMessageColor = document.getElementById('botMessageColor');
const botColorHex = document.getElementById('botColorHex');
const botMessages = document.querySelectorAll('.message-content.bot');

botMessageColor.addEventListener('input', (e) => {
    const color = e.target.value;
    botColorHex.value = color;
    updateBotMessageColor(color);
});

botColorHex.addEventListener('input', (e) => {
    let color = e.target.value;
    if (!color.startsWith('#')) color = '#' + color;
    if (/^#[0-9A-F]{6}$/i.test(color)) {
        botMessageColor.value = color;
        updateBotMessageColor(color);
    }
});

function updateBotMessageColor(color) {
    botMessages.forEach(msg => {
        msg.style.background = color;
    });
}

// Reset color buttons
const resetButtons = document.querySelectorAll('.btn-reset');

resetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        const defaultColor = btn.getAttribute('data-default');

        if (target === 'userMessageColor') {
            userMessageColor.value = defaultColor;
            userColorHex.value = defaultColor;
            updateUserMessageColor(defaultColor);
        } else if (target === 'botMessageColor') {
            botMessageColor.value = defaultColor;
            botColorHex.value = defaultColor;
            updateBotMessageColor(defaultColor);
        }
    });
});

// ============================================
// CHAT PREVIEW SIMULATION
// ============================================

// Sample chatbot behavior based on personality
const personalityGreetings = {
    'default': 'Xin chào! Tôi là {name}. Tôi có thể giúp gì cho bạn?',
    'customer-service': 'Chào anh/chị! Em là {name}. Em có thể hỗ trợ gì cho anh/chị ạ?',
    'sales': 'Xin chào! Mình là {name}. Rất vui được tư vấn cho bạn hôm nay!',
    'tutor': 'Hello! I am {name}. I am here to help you learn. What would you like to study today?',
    'developer': 'Hey! I\'m {name}, your coding assistant. What can I help you build today?',
    'coach': 'Welcome! I\'m {name}, your personal life coach. Let\'s work on your goals together!',
    'fashion': 'Greetings, time traveler! I am {name}, your futuristic fashion consultant. Ready to explore the trends of tomorrow?'
};

// Update greeting when personality changes
chatbotPersonality.addEventListener('change', (e) => {
    const personality = e.target.value;
    const name = chatbotNameInput.value || 'Trợ lý AI';
    const greeting = personalityGreetings[personality].replace('{name}', name);

    // Update first message
    const firstBotMessage = document.querySelector('.message.bot-message .message-content');
    if (firstBotMessage) {
        firstBotMessage.innerHTML = greeting;
    }
});

// ============================================
// CHAT BOX RESIZE FUNCTIONALITY
// ============================================

const chatContainer = document.getElementById('chatContainer');
const resizeHandles = document.querySelectorAll('.resize-handle');

let isResizing = false;
let currentHandle = null;
let startX, startY, startWidth, startHeight;

resizeHandles.forEach(handle => {
    handle.addEventListener('mousedown', initResize);
});

function initResize(e) {
    e.preventDefault();
    isResizing = true;
    currentHandle = e.target.dataset.direction;

    startX = e.clientX;
    startY = e.clientY;
    startWidth = chatContainer.offsetWidth;
    startHeight = chatContainer.offsetHeight;

    document.body.classList.add('resizing');
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
}

function resize(e) {
    if (!isResizing) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let newWidth = startWidth;
    let newHeight = startHeight;

    // Handle different resize directions
    switch (currentHandle) {
        case 'e':
            newWidth = startWidth + dx;
            break;
        case 'w':
            newWidth = startWidth - dx;
            break;
        case 's':
            newHeight = startHeight + dy;
            break;
        case 'n':
            newHeight = startHeight - dy;
            break;
        case 'se':
            newWidth = startWidth + dx;
            newHeight = startHeight + dy;
            break;
        case 'sw':
            newWidth = startWidth - dx;
            newHeight = startHeight + dy;
            break;
        case 'ne':
            newWidth = startWidth + dx;
            newHeight = startHeight - dy;
            break;
        case 'nw':
            newWidth = startWidth - dx;
            newHeight = startHeight - dy;
            break;
    }

    // Apply constraints
    const minWidth = 200;
    const minHeight = 280;
    const maxWidth = 400;
    const maxHeight = 600;

    newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
    newHeight = Math.max(minHeight, Math.min(maxHeight, newHeight));

    chatContainer.style.width = newWidth + 'px';
    chatContainer.style.height = newHeight + 'px';
}

function stopResize() {
    isResizing = false;
    currentHandle = null;
    document.body.classList.remove('resizing');
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
}

// ============================================
// SMOOTH ANIMATIONS & INTERACTIONS
// ============================================

// Add smooth reveal animation to sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all form groups
document.querySelectorAll('.form-group').forEach(group => {
    group.style.opacity = '0';
    group.style.transform = 'translateY(20px)';
    group.style.transition = 'all 0.3s ease-out';
    observer.observe(group);
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S to save (mock)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        console.log('Configuration saved (mock)');
        showNotification('Cấu hình đã được lưu!');
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10B981, #34D399)' : 'linear-gradient(135deg, #EF4444, #F87171)'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
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

// ============================================
// ACTION BUTTONS FUNCTIONALITY
// ============================================

const saveDraftBtn = document.getElementById('saveDraftBtn');
const resetBtn = document.getElementById('resetBtn');
const confirmBtn = document.getElementById('confirmBtn');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const dashboardBtn = document.getElementById('dashboardBtn');
const copyCodeBtn = document.getElementById('copyCodeBtn');
const modalBotName = document.getElementById('modalBotName');

// Save draft
saveDraftBtn.addEventListener('click', () => {
    const config = {
        chatbotName: chatbotNameInput.value,
        personality: chatbotPersonality.value,
        customPrompt: customPrompt.value,
        userMessageColor: userMessageColor.value,
        botMessageColor: botMessageColor.value,
        uploadedFiles: uploadedFiles.length,
        chatboxSize: {
            width: chatContainer.offsetWidth,
            height: chatContainer.offsetHeight
        },
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('chatbot_draft', JSON.stringify(config));
    showNotification('Đã lưu nháp thành công! 💾', 'success');
    console.log('Draft saved:', config);
});

// Reset configuration
resetBtn.addEventListener('click', () => {
    if (confirm('Bạn có chắc chắn muốn đặt lại toàn bộ cấu hình?')) {
        // Reset form fields
        chatbotNameInput.value = 'Trợ lý AI';
        chatbotPersonality.value = 'default';
        customPrompt.value = '';

        // Reset colors
        userMessageColor.value = '#6366F1';
        userColorHex.value = '#6366F1';
        updateUserMessageColor('#6366F1');

        botMessageColor.value = '#F3F4F6';
        botColorHex.value = '#F3F4F6';
        updateBotMessageColor('#F3F4F6');

        // Clear uploaded files
        uploadedFiles.length = 0;
        renderFileList();

        // Reset icon
        iconPreview.innerHTML = `
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="#6366F1"/>
                <path d="M20 10C14 10 10 14 10 20C10 22.5 10.8 24.8 12 26.7L10 30L13.3 28C15.2 29.2 17.5 30 20 30C26 30 30 26 30 20C30 14 26 10 20 10Z" fill="white"/>
            </svg>
        `;
        previewAvatar.innerHTML = iconPreview.innerHTML;

        // Update preview name
        previewName.textContent = 'Trợ lý AI';
        botNameInMessage.textContent = 'Trợ lý AI';

        // Reset chatbox size
        chatContainer.style.width = '280px';
        chatContainer.style.height = '400px';

        // Clear draft from localStorage
        localStorage.removeItem('chatbot_draft');

        showNotification('Đã đặt lại cấu hình! 🔄', 'success');
    }
});

// Confirm and deploy
confirmBtn.addEventListener('click', () => {
    // Update modal with current chatbot name
    modalBotName.textContent = chatbotNameInput.value || 'Trợ lý AI';

    // Show success modal
    successModal.classList.add('active');

    // Mock deployment
    console.log('Deploying chatbot with configuration:', {
        name: chatbotNameInput.value,
        personality: chatbotPersonality.value,
        customPrompt: customPrompt.value,
        userMessageColor: userMessageColor.value,
        botMessageColor: botMessageColor.value,
        filesCount: uploadedFiles.length,
        chatboxSize: {
            width: chatContainer.offsetWidth,
            height: chatContainer.offsetHeight
        }
    });
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    successModal.classList.remove('active');
});

// Dashboard button
dashboardBtn.addEventListener('click', () => {
    showNotification('Chuyển đến Dashboard... 📊', 'success');
    setTimeout(() => {
        successModal.classList.remove('active');
    }, 1000);
});

// Copy embed code
copyCodeBtn.addEventListener('click', () => {
    const embedCode = document.getElementById('embedCode');
    const codeText = embedCode.textContent;

    navigator.clipboard.writeText(codeText).then(() => {
        copyCodeBtn.classList.add('copied');
        copyCodeBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16 5L7.5 14L4 10.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Đã sao chép!
        `;

        setTimeout(() => {
            copyCodeBtn.classList.remove('copied');
            copyCodeBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M13 7V5C13 4.4 12.6 4 12 4H5C4.4 4 4 4.4 4 5V12C4 12.6 4.4 13 5 13H7" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                Sao chép mã
            `;
        }, 2000);
    });
});

// Close modal on overlay click
successModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        successModal.classList.remove('active');
    }
});

// ============================================
// INITIALIZATION
// ============================================

console.log('✅ Custom Chatbot Builder initialized');
console.log('📊 All modules loaded and ready');
console.log('🎨 Real-time preview enabled');
console.log('↔️ Resize functionality enabled');

// Load draft if exists
const savedDraft = localStorage.getItem('chatbot_draft');
if (savedDraft) {
    const draft = JSON.parse(savedDraft);
    chatbotNameInput.value = draft.chatbotName || 'Trợ lý AI';
    chatbotPersonality.value = draft.personality || 'default';
    customPrompt.value = draft.customPrompt || '';

    if (draft.userMessageColor) {
        userMessageColor.value = draft.userMessageColor;
        userColorHex.value = draft.userMessageColor;
        updateUserMessageColor(draft.userMessageColor);
    }

    if (draft.botMessageColor) {
        botMessageColor.value = draft.botMessageColor;
        botColorHex.value = draft.botMessageColor;
        updateBotMessageColor(draft.botMessageColor);
    }

    if (draft.chatboxSize) {
        chatContainer.style.width = draft.chatboxSize.width + 'px';
        chatContainer.style.height = draft.chatboxSize.height + 'px';
    }

    previewName.textContent = draft.chatbotName || 'Trợ lý AI';
    botNameInMessage.textContent = draft.chatbotName || 'Trợ lý AI';

    console.log('📝 Loaded draft from:', new Date(draft.timestamp).toLocaleString('vi-VN'));
}

// Show welcome notification
setTimeout(() => {
    showNotification('Chào mừng đến với Chatbot Builder! 🚀');
}, 500);
