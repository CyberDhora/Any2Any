// Tool Data
const tools = [
    {
        id: 'merge',
        name: 'Merge PDF',
        description: 'Combine PDFs in the order you want with the easiest PDF merger available.',
        category: 'organize',
        icon: 'fa-file-pdf'
    },
    {
        id: 'split',
        name: 'Split PDF',
        description: 'Separate one page or a whole set for easy conversion into independent PDF files.',
        category: 'organize',
        icon: 'fa-cut'
    },
    {
        id: 'compress',
        name: 'Compress PDF',
        description: 'Reduce file size while optimizing for maximal PDF quality.',
        category: 'optimize',
        icon: 'fa-compress-alt'
    },
    {
        id: 'pdf-to-word',
        name: 'PDF to Word',
        description: 'Easily convert your PDF files into easy to edit DOC and DOCX documents.',
        category: 'convert',
        icon: 'fa-file-word'
    },
    {
        id: 'pdf-to-ppt',
        name: 'PDF to PowerPoint',
        description: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.',
        category: 'convert',
        icon: 'fa-file-powerpoint'
    },
    {
        id: 'pdf-to-excel',
        name: 'PDF to Excel',
        description: 'Pull data straight from PDFs into Excel spreadsheets in a few short seconds.',
        category: 'convert',
        icon: 'fa-file-excel'
    },
    {
        id: 'word-to-pdf',
        name: 'Word to PDF',
        description: 'Make DOC and DOCX files easy to read by converting them to PDF.',
        category: 'convert',
        icon: 'fa-file-pdf'
    },
    {
        id: 'ppt-to-pdf',
        name: 'PowerPoint to PDF',
        description: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.',
        category: 'convert',
        icon: 'fa-file-pdf'
    },
    {
        id: 'excel-to-pdf',
        name: 'Excel to PDF',
        description: 'Make EXCEL spreadsheets easy to read by converting them to PDF.',
        category: 'convert',
        icon: 'fa-file-pdf'
    },
    {
        id: 'edit-pdf',
        name: 'Edit PDF',
        description: 'Add text, images, shapes or freehand annotations to a PDF document.',
        category: 'edit',
        icon: 'fa-edit'
    },
    {
        id: 'pdf-to-jpg',
        name: 'PDF to JPG',
        description: 'Convert each PDF page into a JPG or extract all images contained in a PDF.',
        category: 'convert',
        icon: 'fa-file-image'
    },
    {
        id: 'jpg-to-pdf',
        name: 'JPG to PDF',
        description: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.',
        category: 'convert',
        icon: 'fa-file-pdf'
    },
    {
        id: 'sign-pdf',
        name: 'Sign PDF',
        description: 'Sign yourself or request electronic signatures from others.',
        category: 'edit',
        icon: 'fa-signature'
    },
    {
        id: 'watermark',
        name: 'Watermark',
        description: 'Stamp an image or text over your PDF in seconds.',
        category: 'edit',
        icon: 'fa-stamp'
    },
    {
        id: 'rotate-pdf',
        name: 'Rotate PDF',
        description: 'Rotate your PDFs the way you need them.',
        category: 'organize',
        icon: 'fa-redo'
    },
    {
        id: 'html-to-pdf',
        name: 'HTML to PDF',
        description: 'Convert webpages in HTML to PDF.',
        category: 'convert',
        icon: 'fa-file-code'
    },
    {
        id: 'unlock-pdf',
        name: 'Unlock PDF',
        description: 'Remove PDF password security.',
        category: 'security',
        icon: 'fa-unlock'
    },
    {
        id: 'protect-pdf',
        name: 'Protect PDF',
        description: 'Protect PDF files with a password.',
        category: 'security',
        icon: 'fa-lock'
    },
    {
        id: 'organize-pdf',
        name: 'Organize PDF',
        description: 'Sort pages of your PDF file however you like.',
        category: 'organize',
        icon: 'fa-sort'
    },
    {
        id: 'pdf-to-pdfa',
        name: 'PDF to PDF/A',
        description: 'Transform your PDF to PDF/A for long-term archiving.',
        category: 'optimize',
        icon: 'fa-file-archive'
    },
    {
        id: 'repair-pdf',
        name: 'Repair PDF',
        description: 'Repair a damaged PDF and recover data from corrupt PDF.',
        category: 'optimize',
        icon: 'fa-wrench'
    },
    {
        id: 'page-numbers',
        name: 'Page Numbers',
        description: 'Add page numbers into PDFs with ease.',
        category: 'edit',
        icon: 'fa-list-ol'
    },
    {
        id: 'scan-to-pdf',
        name: 'Scan to PDF',
        description: 'Capture document scans from your mobile device.',
        category: 'convert',
        icon: 'fa-scanner'
    },
    {
        id: 'ocr-pdf',
        name: 'OCR PDF',
        description: 'Easily convert scanned PDF into searchable documents.',
        category: 'convert',
        icon: 'fa-search'
    },
    {
        id: 'compare-pdf',
        name: 'Compare PDF',
        description: 'Show a side-by-side document comparison.',
        category: 'workflows',
        icon: 'fa-columns'
    },
    {
        id: 'redact-pdf',
        name: 'Redact PDF',
        description: 'Permanently remove sensitive information from a PDF.',
        category: 'security',
        icon: 'fa-eye-slash'
    },
    {
        id: 'crop-pdf',
        name: 'Crop PDF',
        description: 'Crop margins of PDF documents or select specific areas.',
        category: 'edit',
        icon: 'fa-crop'
    },
    {
        id: 'create-workflow',
        name: 'Create Workflow',
        description: 'Create custom workflows with your favorite tools.',
        category: 'workflows',
        icon: 'fa-project-diagram'
    }
];

// DOM Elements
const toolsGrid = document.querySelector('.tools-grid');
const categoryTabs = document.querySelectorAll('.tab-btn');
const searchInput = document.querySelector('.search-box input');
const toolInterface = document.querySelector('.tool-interface');
const toolTitle = document.getElementById('tool-title');
const toolDescription = document.getElementById('tool-description');
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const selectedFiles = document.getElementById('selected-files');
const processBtn = document.getElementById('process-btn');
const clearBtn = document.getElementById('clear-btn');
const toolOptions = document.querySelector('.tool-options');
const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const closeModals = document.querySelectorAll('.close-modal');
const switchToSignup = document.getElementById('switch-to-signup');
const switchToLogin = document.getElementById('switch-to-login');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Current tool state
let currentTool = null;
let selectedFilesList = [];

// Initialize the page
function init() {
    // Load all tools
    loadTools(tools);
    
    // Set up event listeners
    setupEventListeners();
}

// Load tools into the grid
function loadTools(toolsToLoad, category = 'all') {
    toolsGrid.innerHTML = '';
    
    toolsToLoad.forEach(tool => {
        if (category === 'all' || tool.category === category) {
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card';
            toolCard.dataset.tool = tool.id;
            toolCard.innerHTML = `
                <div class="tool-icon">
                    <i class="fas ${tool.icon}"></i>
                </div>
                <div class="tool-info">
                    <h3>${tool.name}</h3>
                    <p>${tool.description}</p>
                    <button class="tool-btn" data-tool="${tool.id}">Use Tool</button>
                </div>
            `;
            toolsGrid.appendChild(toolCard);
        }
    });
    
    // Add click event to tool buttons
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const toolId = btn.dataset.tool;
            openTool(toolId);
        });
    });
    
    // Add click event to tool cards
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', () => {
            const toolId = card.dataset.tool;
            openTool(toolId);
        });
    });
}

// Open a specific tool
function openTool(toolId) {
    const tool = tools.find(t => t.id === toolId);
    if (!tool) return;
    
    currentTool = tool;
    
    // Update the tool interface
    toolTitle.textContent = tool.name;
    toolDescription.textContent = tool.description;
    
    // Show the tool interface and hide other sections
    document.querySelectorAll('main > section').forEach(section => {
        section.style.display = 'none';
    });
    toolInterface.style.display = 'block';
    
    // Scroll to the tool interface
    toolInterface.scrollIntoView({ behavior: 'smooth' });
    
    // Load tool-specific options
    loadToolOptions(toolId);
    
    // Clear any previous files
    clearFiles();
}

// Load tool-specific options
function loadToolOptions(toolId) {
    toolOptions.innerHTML = '';
    
    switch (toolId) {
        case 'merge':
            toolOptions.innerHTML = `
                <div class="option-group">
                    <h4>Merge Options</h4>
                    <div class="option-row">
                        <input type="checkbox" id="merge-bookmarks" name="merge-bookmarks">
                        <label for="merge-bookmarks">Keep bookmarks from all documents</label>
                    </div>
                    <div class="option-row">
                        <input type="checkbox" id="merge-forms" name="merge-forms" checked>
                        <label for="merge-forms">Merge form fields</label>
                    </div>
                </div>
            `;
            break;
            
        case 'split':
            toolOptions.innerHTML = `
                <div class="option-group">
                    <h4>Split Options</h4>
                    <div class="option-row">
                        <input type="radio" id="split-range" name="split-method" value="range" checked>
                        <label for="split-range">Extract pages by range</label>
                    </div>
                    <div class="option-row">
                        <input type="radio" id="split-every" name="split-method" value="every">
                        <label for="split-every">Split every</label>
                        <input type="number" id="split-every-n" name="split-every-n" min="1" value="1" disabled>
                        <label for="split-every-n">pages</label>
                    </div>
                    <div class="option-row">
                        <input type="radio" id="split-bookmarks" name="split-method" value="bookmarks">
                        <label for="split-bookmarks">Split by bookmarks</label>
                    </div>
                </div>
            `;
            
            // Enable/disable number input based on radio selection
            document.getElementById('split-every').addEventListener('change', function() {
                document.getElementById('split-every-n').disabled = !this.checked;
            });
            break;
            
        case 'compress':
            toolOptions.innerHTML = `
                <div class="option-group">
                    <h4>Compression Level</h4>
                    <div class="option-row">
                        <input type="radio" id="compress-low" name="compress-level" value="low" checked>
                        <label for="compress-low">Low compression (best quality)</label>
                    </div>
                    <div class="option-row">
                        <input type="radio" id="compress-medium" name="compress-level" value="medium">
                        <label for="compress-medium">Medium compression</label>
                    </div>
                    <div class="option-row">
                        <input type="radio" id="compress-high" name="compress-level" value="high">
                        <label for="compress-high">High compression (smallest file)</label>
                    </div>
                </div>
            `;
            break;
            
        // Add more tool options as needed
        default:
            toolOptions.innerHTML = '<p>No additional options available for this tool.</p>';
    }
}

// Set up event listeners
function setupEventListeners() {
    // Category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const category = tab.dataset.category;
            if (category === 'all') {
                loadTools(tools);
            } else {
                const filteredTools = tools.filter(tool => tool.category === category);
                loadTools(filteredTools, category);
            }
        });
    });
    
    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.length > 0) {
            const filteredTools = tools.filter(tool => 
                tool.name.toLowerCase().includes(searchTerm) || 
                tool.description.toLowerCase().includes(searchTerm)
            );
            loadTools(filteredTools);
        } else {
            loadTools(tools);
        }
    });
    
    // File upload
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary-color)';
        uploadArea.style.backgroundColor = 'rgba(255, 68, 97, 0.05)';
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--light-gray)';
        uploadArea.style.backgroundColor = 'transparent';
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--light-gray)';
        uploadArea.style.backgroundColor = 'transparent';
        
        if (e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    });
    
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            handleFiles(fileInput.files);
        }
    });
    
    // Process and clear buttons
    processBtn.addEventListener('click', processFiles);
    clearBtn.addEventListener('click', clearFiles);
    
    // Auth modals
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });
    
    signupBtn.addEventListener('click', () => {
        signupModal.style.display = 'flex';
    });
    
    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
        });
    });
    
    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'flex';
    });
    
    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });
    
    // Modal clicks
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });
    
    // Form submissions
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login functionality would be implemented here');
        loginModal.style.display = 'none';
    });
    
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Signup functionality would be implemented here');
        signupModal.style.display = 'none';
    });
    
    // Footer tool links
    document.querySelectorAll('[data-tool]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openTool(link.dataset.tool);
        });
    });
}

// Handle selected files
function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Check if file is PDF (in a real app, you'd do proper validation)
        if (!file.name.toLowerCase().endsWith('.pdf') && currentTool.id !== 'jpg-to-pdf') {
            alert('Please select PDF files only for this tool.');
            continue;
        }
        
        // Add to selected files list if not already there
        if (!selectedFilesList.some(f => f.name === file.name && f.size === file.size)) {
            selectedFilesList.push(file);
        }
    }
    
    updateSelectedFilesDisplay();
}

// Update the selected files display
function updateSelectedFilesDisplay() {
    selectedFiles.innerHTML = '';
    
    if (selectedFilesList.length === 0) {
        selectedFiles.innerHTML = '<p>No files selected</p>';
        return;
    }
    
    selectedFilesList.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <div class="file-info">
                <i class="fas fa-file-pdf file-icon"></i>
                <span>${file.name} (${formatFileSize(file.size)})</span>
            </div>
            <div class="file-actions">
                <button class="file-action-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
                <button class="file-action-btn" data-index="${index}"><i class="fas fa-arrow-up"></i></button>
                <button class="file-action-btn" data-index="${index}"><i class="fas fa-arrow-down"></i></button>
            </div>
        `;
        selectedFiles.appendChild(fileItem);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.file-action-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(btn.dataset.index);
            
            if (btn.querySelector('.fa-trash')) {
                // Remove file
                selectedFilesList.splice(index, 1);
                updateSelectedFilesDisplay();
            } else if (btn.querySelector('.fa-arrow-up') && index > 0) {
                // Move file up
                [selectedFilesList[index], selectedFilesList[index - 1]] = [selectedFilesList[index - 1], selectedFilesList[index]];
                updateSelectedFilesDisplay();
            } else if (btn.querySelector('.fa-arrow-down') && index < selectedFilesList.length - 1) {
                // Move file down
                [selectedFilesList[index], selectedFilesList[index + 1]] = [selectedFilesList[index + 1], selectedFilesList[index]];
                updateSelectedFilesDisplay();
            }
        });
    });
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Process files (simulated)
function processFiles() {
    if (selectedFilesList.length === 0) {
        alert('Please select at least one file to process.');
        return;
    }
    
    // In a real app, this would upload and process the files
    // Here we just simulate processing
    processBtn.disabled = true;
    processBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    setTimeout(() => {
        alert(`Files processed with ${currentTool.name} tool! In a real application, this would download the processed file.`);
        processBtn.disabled = false;
        processBtn.textContent = getProcessButtonText(currentTool.id);
    }, 2000);
}

// Get process button text based on tool
function getProcessButtonText(toolId) {
    switch (toolId) {
        case 'merge': return 'Merge PDF';
        case 'split': return 'Split PDF';
        case 'compress': return 'Compress PDF';
        case 'pdf-to-word': return 'Convert to Word';
        case 'pdf-to-ppt': return 'Convert to PowerPoint';
        case 'pdf-to-excel': return 'Convert to Excel';
        case 'word-to-pdf': return 'Convert to PDF';
        case 'ppt-to-pdf': return 'Convert to PDF';
        case 'excel-to-pdf': return 'Convert to PDF';
        case 'pdf-to-jpg': return 'Convert to JPG';
        case 'jpg-to-pdf': return 'Convert to PDF';
        default: return 'Process';
    }
}

// Clear selected files
function clearFiles() {
    selectedFilesList = [];
    updateSelectedFilesDisplay();
    fileInput.value = '';
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);
