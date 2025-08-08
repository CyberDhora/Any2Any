// Tool Data with categories and icons
const tools = [
    {
        id: 'merge',
        name: 'Merge PDF',
        description: 'Combine PDFs in the order you want with the easiest PDF merger available.',
        category: 'organize',
        icon: 'fa-file-pdf',
        accepts: '.pdf'
    },
    {
        id: 'split',
        name: 'Split PDF',
        description: 'Separate one page or a whole set for easy conversion into independent PDF files.',
        category: 'organize',
        icon: 'fa-cut',
        accepts: '.pdf'
    },
    {
        id: 'compress',
        name: 'Compress PDF',
        description: 'Reduce file size while optimizing for maximal PDF quality.',
        category: 'organize',
        icon: 'fa-compress-alt',
        accepts: '.pdf'
    },
    {
        id: 'pdf-to-word',
        name: 'PDF to Word',
        description: 'Easily convert your PDF files into easy to edit DOC and DOCX documents.',
        category: 'convert',
        icon: 'fa-file-word',
        accepts: '.pdf'
    },
    {
        id: 'pdf-to-excel',
        name: 'PDF to Excel',
        description: 'Pull data straight from PDFs into Excel spreadsheets in a few short seconds.',
        category: 'convert',
        icon: 'fa-file-excel',
        accepts: '.pdf'
    },
    {
        id: 'word-to-pdf',
        name: 'Word to PDF',
        description: 'Make DOC and DOCX files easy to read by converting them to PDF.',
        category: 'convert',
        icon: 'fa-file-pdf',
        accepts: '.doc,.docx'
    },
    {
        id: 'excel-to-pdf',
        name: 'Excel to PDF',
        description: 'Make EXCEL spreadsheets easy to read by converting them to PDF.',
        category: 'convert',
        icon: 'fa-file-pdf',
        accepts: '.xls,.xlsx'
    },
    {
        id: 'jpg-to-pdf',
        name: 'JPG to PDF',
        description: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.',
        category: 'convert',
        icon: 'fa-file-pdf',
        accepts: '.jpg,.jpeg,.png'
    },
    {
        id: 'edit-pdf',
        name: 'Edit PDF',
        description: 'Add text, images, shapes or freehand annotations to a PDF document.',
        category: 'edit',
        icon: 'fa-edit',
        accepts: '.pdf'
    },
    {
        id: 'rotate-pdf',
        name: 'Rotate PDF',
        description: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!',
        category: 'edit',
        icon: 'fa-redo',
        accepts: '.pdf'
    },
    {
        id: 'unlock-pdf',
        name: 'Unlock PDF',
        description: 'Remove PDF password security, giving you the freedom to use your PDFs as you want.',
        category: 'security',
        icon: 'fa-unlock',
        accepts: '.pdf'
    },
    {
        id: 'protect-pdf',
        name: 'Protect PDF',
        description: 'Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access.',
        category: 'security',
        icon: 'fa-lock',
        accepts: '.pdf'
    },
    {
        id: 'watermark',
        name: 'Watermark PDF',
        description: 'Stamp an image or text over your PDF in seconds. Choose the typography, transparency and position.',
        category: 'edit',
        icon: 'fa-stamp',
        accepts: '.pdf'
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
const toolOptions = document.getElementById('tool-options');
const processingStatus = document.getElementById('processing-status');
const downloadArea = document.getElementById('download-area');
const downloadBtn = document.getElementById('download-btn');
const homeLink = document.getElementById('home-link');

// Current tool state
let currentTool = null;
let selectedFilesList = [];
let processedFile = null;

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';

// Initialize the page
function init() {
    // Load all tools
    loadTools(tools);
    
    // Set up event listeners
    setupEventListeners();
    
    // Set initial theme
    setTheme('blue');
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
    processBtn.textContent = getProcessButtonText(tool.id);
    
    // Set accepted file types
    fileInput.accept = tool.accepts;
    
    // Show the tool interface and hide other sections
    document.querySelectorAll('main > section').forEach(section => {
        section.style.display = 'none';
    });
    toolInterface.style.display = 'block';
    
    // Scroll to the tool interface
    toolInterface.scrollIntoView({ behavior: 'smooth' });
    
    // Load tool-specific options
    loadToolOptions(toolId);
    
    // Clear any previous files and processing results
    clearFiles();
    hideDownloadArea();
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
                <div class="option-group" id="page-range-group">
                    <h4>Page Range</h4>
                    <div class="option-row">
                        <label for="split-start">From page</label>
                        <input type="number" id="split-start" name="split-start" min="1" value="1">
                        <label for="split-end">to</label>
                        <input type="number" id="split-end" name="split-end" min="1" value="1">
                    </div>
                </div>
            `;
            
            // Enable/disable inputs based on selection
            document.getElementById('split-every').addEventListener('change', function() {
                document.getElementById('split-every-n').disabled = !this.checked;
                document.getElementById('page-range-group').style.display = 'none';
            });
            
            document.getElementById('split-range').addEventListener('change', function() {
                document.getElementById('page-range-group').style.display = this.checked ? 'block' : 'none';
            });
            
            document.getElementById('split-bookmarks').addEventListener('change', function() {
                document.getElementById('page-range-group').style.display = 'none';
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
            
        case 'rotate-pdf':
            toolOptions.innerHTML = `
                <div class="option-group">
                    <h4>Rotation Options</h4>
                    <div class="option-row">
                        <input type="radio" id="rotate-90" name="rotate-angle" value="90" checked>
                        <label for="rotate-90">Rotate 90° clockwise</label>
                    </div>
                    <div class="option-row">
                        <input type="radio" id="rotate-180" name="rotate-angle" value="180">
                        <label for="rotate-180">Rotate 180°</label>
                    </div>
                    <div class="option-row">
                        <input type="radio" id="rotate-270" name="rotate-angle" value="270">
                        <label for="rotate-270">Rotate 90° counter-clockwise</label>
                    </div>
                </div>
                <div class="option-group">
                    <div class="option-row">
                        <input type="checkbox" id="rotate-all" name="rotate-all" checked>
                        <label for="rotate-all">Apply to all pages</label>
                    </div>
                </div>
            `;
            break;
            
        case 'protect-pdf':
            toolOptions.innerHTML = `
                <div class="option-group">
                    <h4>Security Options</h4>
                    <div class="option-row">
                        <label for="protect-password">Password</label>
                        <input type="password" id="protect-password" name="protect-password" required>
                    </div>
                    <div class="option-row">
                        <label for="protect-confirm">Confirm Password</label>
                        <input type="password" id="protect-confirm" name="protect-confirm" required>
                    </div>
                </div>
                <div class="option-group">
                    <h4>Permissions</h4>
                    <div class="option-row">
                        <input type="checkbox" id="allow-printing" name="allow-printing" checked>
                        <label for="allow-printing">Allow printing</label>
                    </div>
                    <div class="option-row">
                        <input type="checkbox" id="allow-copying" name="allow-copying" checked>
                        <label for="allow-copying">Allow copying text</label>
                    </div>
                    <div class="option-row">
                        <input type="checkbox" id="allow-modification" name="allow-modification">
                        <label for="allow-modification">Allow modification</label>
                    </div>
                </div>
            `;
            break;
            
        case 'watermark':
            toolOptions.innerHTML = `
                <div class="option-group">
                    <h4>Watermark Type</h4>
                    <div class="option-row">
                        <input type="radio" id="watermark-text" name="watermark-type" value="text" checked>
                        <label for="watermark-text">Text</label>
                    </div>
                    <div class="option-row">
                        <input type="radio" id="watermark-image" name="watermark-type" value="image">
                        <label for="watermark-image">Image</label>
                    </div>
                </div>
                <div class="option-group" id="watermark-text-options">
                    <div class="option-row">
                        <label for="watermark-text-content">Text</label>
                        <input type="text" id="watermark-text-content" name="watermark-text-content" value="Confidential">
                    </div>
                    <div class="option-row">
                        <label for="watermark-text-color">Color</label>
                        <input type="color" id="watermark-text-color" name="watermark-text-color" value="#000000">
                    </div>
                    <div class="option-row">
                        <label for="watermark-text-opacity">Opacity</label>
                        <input type="range" id="watermark-text-opacity" name="watermark-text-opacity" min="10" max="100" value="50">
                        <span id="opacity-value">50%</span>
                    </div>
                    <div class="option-row">
                        <label for="watermark-text-size">Size</label>
                        <select id="watermark-text-size" name="watermark-text-size">
                            <option value="small">Small</option>
                            <option value="medium" selected>Medium</option>
                            <option value="large">Large</option>
                            <option value="xlarge">Extra Large</option>
                        </select>
                    </div>
                    <div class="option-row">
                        <label for="watermark-text-angle">Angle</label>
                        <input type="range" id="watermark-text-angle" name="watermark-text-angle" min="0" max="359" value="45">
                        <span id="angle-value">45°</span>
                    </div>
                </div>
                <div class="option-group" id="watermark-image-options" style="display: none;">
                    <div class="option-row">
                        <label for="watermark-image-file">Image File</label>
                        <input type="file" id="watermark-image-file" name="watermark-image-file" accept=".jpg,.jpeg,.png">
                    </div>
                    <div class="option-row">
                        <label for="watermark-image-opacity">Opacity</label>
                        <input type="range" id="watermark-image-opacity" name="watermark-image-opacity" min="10" max="100" value="50">
                        <span id="image-opacity-value">50%</span>
                    </div>
                    <div class="option-row">
                        <label for="watermark-image-size">Size</label>
                        <select id="watermark-image-size" name="watermark-image-size">
                            <option value="small">Small</option>
                            <option value="medium" selected>Medium</option>
                            <option value="large">Large</option>
                            <option value="original">Original</option>
                        </select>
                    </div>
                </div>
            `;
            
            // Toggle between text and image options
            document.getElementById('watermark-text').addEventListener('change', function() {
                document.getElementById('watermark-text-options').style.display = 'block';
                document.getElementById('watermark-image-options').style.display = 'none';
            });
            
            document.getElementById('watermark-image').addEventListener('change', function() {
                document.getElementById('watermark-text-options').style.display = 'none';
                document.getElementById('watermark-image-options').style.display = 'block';
            });
            
            // Update opacity value display
            document.getElementById('watermark-text-opacity').addEventListener('input', function() {
                document.getElementById('opacity-value').textContent = this.value + '%';
            });
            
            document.getElementById('watermark-image-opacity').addEventListener('input', function() {
                document.getElementById('image-opacity-value').textContent = this.value + '%';
            });
            
            // Update angle value display
            document.getElementById('watermark-text-angle').addEventListener('input', function() {
                document.getElementById('angle-value').textContent = this.value + '°';
            });
            break;
            
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
        uploadArea.style.backgroundColor = 'rgba(66, 133, 244, 0.05)';
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
    
    // Download button
    downloadBtn.addEventListener('click', downloadProcessedFile);
    
    // Home link
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('main > section').forEach(section => {
            section.style.display = 'none';
        });
        document.querySelector('.hero').style.display = 'block';
        document.querySelector('.categories').style.display = 'block';
        document.querySelector('.features').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Theme selector
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            setTheme(theme);
        });
    });
    
    // Footer tool links
    document.querySelectorAll('[data-tool]').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.tagName === 'A') {
                e.preventDefault();
                openTool(link.dataset.tool);
            }
        });
    });
}

// Set theme
function setTheme(theme) {
    document.body.className = `theme-gradient-${theme}`;
}

// Handle selected files
function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Check file type based on current tool
        const acceptedTypes = currentTool.accepts.split(',');
        const fileExt = '.' + file.name.split('.').pop().toLowerCase();
        
        if (!acceptedTypes.includes(fileExt)) {
            alert(`Please select ${acceptedTypes.join(' or ')} files only for ${currentTool.name}.`);
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
                <i class="fas ${getFileIcon(file.name)} file-icon"></i>
                <span class="file-name">${file.name}</span>
                <span class="file-size">(${formatFileSize(file.size)})</span>
            </div>
            <div class="file-actions">
                <button class="file-action-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
                ${index > 0 ? `<button class="file-action-btn" data-index="${index}"><i class="fas fa-arrow-up"></i></button>` : ''}
                ${index < selectedFilesList.length - 1 ? `<button class="file-action-btn" data-index="${index}"><i class="fas fa-arrow-down"></i></button>` : ''}
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
            } else if (btn.querySelector('.fa-arrow-up')) {
                // Move file up
                [selectedFilesList[index], selectedFilesList[index - 1]] = [selectedFilesList[index - 1], selectedFilesList[index]];
                updateSelectedFilesDisplay();
            } else if (btn.querySelector('.fa-arrow-down')) {
                // Move file down
                [selectedFilesList[index], selectedFilesList[index + 1]] = [selectedFilesList[index + 1], selectedFilesList[index]];
                updateSelectedFilesDisplay();
            }
        });
    });
}

// Get file icon based on extension
function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    switch (ext) {
        case 'pdf': return 'fa-file-pdf';
        case 'doc':
        case 'docx': return 'fa-file-word';
        case 'xls':
        case 'xlsx': return 'fa-file-excel';
        case 'ppt':
        case 'pptx': return 'fa-file-powerpoint';
        case 'jpg':
        case 'jpeg':
        case 'png': return 'fa-file-image';
        default: return 'fa-file';
    }
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Process files based on current tool
async function processFiles() {
    if (selectedFilesList.length === 0) {
        alert('Please select at least one file to process.');
        return;
    }
    
    // Validate specific tool requirements
    if (currentTool.id === 'merge' && selectedFilesList.length < 2) {
        alert('Please select at least 2 files to merge.');
        return;
    }
    
    if (currentTool.id === 'protect-pdf') {
        const password = document.getElementById('protect-password').value;
        const confirm = document.getElementById('protect-confirm').value;
        
        if (password !== confirm) {
            alert('Passwords do not match.');
            return;
        }
        
        if (password.length < 4) {
            alert('Password must be at least 4 characters.');
            return;
        }
    }
    
    // Show processing status
    showProcessingStatus();
    
    try {
        switch (currentTool.id) {
            case 'merge':
                processedFile = await mergePDFs(selectedFilesList);
                break;
            case 'split':
                processedFile = await splitPDF(selectedFilesList[0]);
                break;
            case 'compress':
                processedFile = await compressPDF(selectedFilesList[0]);
                break;
            case 'pdf-to-word':
                processedFile = await convertPDFToWord(selectedFilesList[0]);
                break;
            case 'pdf-to-excel':
                processedFile = await convertPDFToExcel(selectedFilesList[0]);
                break;
            case 'word-to-pdf':
                processedFile = await convertWordToPDF(selectedFilesList[0]);
                break;
            case 'excel-to-pdf':
                processedFile = await convertExcelToPDF(selectedFilesList[0]);
                break;
            case 'jpg-to-pdf':
                processedFile = await convertImagesToPDF(selectedFilesList);
                break;
            case 'rotate-pdf':
                processedFile = await rotatePDF(selectedFilesList[0]);
                break;
            case 'protect-pdf':
                processedFile = await protectPDF(selectedFilesList[0]);
                break;
            case 'unlock-pdf':
                processedFile = await unlockPDF(selectedFilesList[0]);
                break;
            case 'watermark':
                processedFile = await addWatermark(selectedFilesList[0]);
                break;
            default:
                throw new Error('Tool not implemented yet');
        }
        
        // Show download area
        showDownloadArea();
    } catch (error) {
        console.error('Processing error:', error);
        alert('An error occurred during processing: ' + error.message);
    } finally {
        hideProcessingStatus();
    }
}

// Show processing status
function showProcessingStatus() {
    processingStatus.innerHTML = '<i class="fas fa-spinner"></i> Processing your file...';
    processingStatus.style.display = 'block';
    processingStatus.classList.add('active');
    processBtn.disabled = true;
}

// Hide processing status
function hideProcessingStatus() {
    processingStatus.style.display = 'none';
    processingStatus.classList.remove('active');
    processBtn.disabled = false;
}

// Show download area
function showDownloadArea() {
    downloadArea.style.display = 'block';
}

// Hide download area
function hideDownloadArea() {
    downloadArea.style.display = 'none';
    processedFile = null;
}

// Download processed file
function downloadProcessedFile() {
    if (!processedFile) return;
    
    const outputFilename = getOutputFilename();
    download(processedFile, outputFilename, processedFile.type);
}

// Get output filename based on tool and input files
function getOutputFilename() {
    const inputName = selectedFilesList[0].name.split('.')[0];
    
    switch (currentTool.id) {
        case 'merge':
            return 'merged-document.pdf';
        case 'split':
            return `${inputName}-split.pdf`;
        case 'compress':
            return `${inputName}-compressed.pdf`;
        case 'pdf-to-word':
            return `${inputName}.docx`;
        case 'pdf-to-excel':
            return `${inputName}.xlsx`;
        case 'word-to-pdf':
        case 'excel-to-pdf':
        case 'jpg-to-pdf':
            return `${inputName}.pdf`;
        case 'rotate-pdf':
            return `${inputName}-rotated.pdf`;
        case 'protect-pdf':
            return `${inputName}-protected.pdf`;
        case 'unlock-pdf':
            return `${inputName}-unlocked.pdf`;
        case 'watermark':
            return `${inputName}-watermarked.pdf`;
        default:
            return 'document.pdf';
    }
}

// Get process button text based on tool
function getProcessButtonText(toolId) {
    switch (toolId) {
        case 'merge': return 'Merge PDF';
        case 'split': return 'Split PDF';
        case 'compress': return 'Compress PDF';
        case 'pdf-to-word': return 'Convert to Word';
        case 'pdf-to-excel': return 'Convert to Excel';
        case 'word-to-pdf': return 'Convert to PDF';
        case 'excel-to-pdf': return 'Convert to PDF';
        case 'jpg-to-pdf': return 'Convert to PDF';
        case 'rotate-pdf': return 'Rotate PDF';
        case 'protect-pdf': return 'Protect PDF';
        case 'unlock-pdf': return 'Unlock PDF';
        case 'watermark': return 'Add Watermark';
        default: return 'Process';
    }
}

// Clear selected files
function clearFiles() {
    selectedFilesList = [];
    updateSelectedFilesDisplay();
    fileInput.value = '';
    hideDownloadArea();
}

// ==============================================
// PDF Processing Functions (Simulated)
// In a real app, these would use actual PDF libraries
// ==============================================

async function mergePDFs(files) {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you would use pdf-lib to merge PDFs
    // This is just a simulation that returns a dummy PDF
    const dummyPdf = await generateDummyPDF('Merged Document');
    return dummyPdf;
}

async function splitPDF(pdfFile) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const dummyPdf = await generateDummyPDF('Split Document');
    return dummyPdf;
}

async function compressPDF(pdfFile) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const dummyPdf = await generateDummyPDF('Compressed Document');
    return dummyPdf;
}

async function convertPDFToWord(pdfFile) {
    await new Promise(resolve => setTimeout(resolve, 2500));
    return new Blob(['Dummy Word content'], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
}

async function convertPDFToExcel(pdfFile) {
    await new Promise(resolve => setTimeout(resolve, 2500));
    return new Blob(['Dummy Excel content'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

async function convertWordToPDF(wordFile) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await generateDummyPDF('Converted from Word');
}

async function convertExcelToPDF(excelFile) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await generateDummyPDF('Converted from Excel');
}

async function convertImagesToPDF(images) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return await generateDummyPDF('Converted from Images');
}

async function rotatePDF(pdfFile) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return await generateDummyPDF('Rotated Document');
}

async function protectPDF(pdfFile) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await generateDummyPDF('Protected Document');
}

async function unlockPDF(pdfFile) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return await generateDummyPDF('Unlocked Document');
}

async function addWatermark(pdfFile) {
    await new Promise(resolve => setTimeout(resolve, 2500));
    return await generateDummyPDF('Watermarked Document');
}

// Helper function to generate a dummy PDF for simulation
async function generateDummyPDF(title) {
    // In a real app, you would use pdf-lib to create a PDF
    // This is just a simulation that returns a dummy PDF blob
    const dummyText = `This is a simulated ${title}\n\n`;
    const blob = new Blob([dummyText], { type: 'application/pdf' });
    return blob;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);
