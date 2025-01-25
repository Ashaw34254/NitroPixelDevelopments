// Content Management System Core
const CMS = {
    // State management
    state: {
        currentContent: null,
        unsavedChanges: false,
        previewMode: false
    },

    // Initialize the CMS
    init() {
        this.loadCurrentContent();
        this.setupEventListeners();
        this.initializeEditors();
    },

    // Event Listeners
    setupEventListeners() {
        // Save changes
        document.querySelector('.admin-button-primary').addEventListener('click', () => this.saveChanges());
        
        // Preview changes
        document.querySelector('.admin-button-secondary').addEventListener('click', () => this.togglePreview());
        
        // Track changes
        document.querySelectorAll('.editor-input').forEach(input => {
            input.addEventListener('change', () => {
                this.state.unsavedChanges = true;
                this.showNotification('Changes detected - don\'t forget to save!');
            });
        });

        // Window close warning
        window.addEventListener('beforeunload', (e) => {
            if (this.state.unsavedChanges) {
                e.preventDefault();
                return e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            }
        });
    },

    initializeEditors() {
        // Initialize rich text editors if needed
        this.setupImagePreviews();
        this.setupTagManagement();
        this.setupAutoSave();
    },

    setupImagePreviews() {
        document.querySelectorAll('input[type="file"]').forEach(input => {
            input.addEventListener('change', (e) => {
                const file = e.target.files[0];
                const preview = e.target.parentElement.querySelector('.image-preview');
                
                if (file && preview) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        preview.style.backgroundImage = `url(${e.target.result})`;
                    };
                    reader.readAsDataURL(file);
                }
            });
        });
    },

    setupTagManagement() {
        document.querySelectorAll('.tag-container input').forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === ',') {
                    e.preventDefault();
                    const value = input.value.trim();
                    if (value) {
                        this.addTag(input.parentElement, value);
                        input.value = '';
                    }
                }
            });
        });
    },

    setupAutoSave() {
        setInterval(() => {
            if (this.state.unsavedChanges) {
                this.saveChanges();
            }
        }, 300000); // Auto-save every 5 minutes
    },

    addTag(container, tagText) {
        const tag = document.createElement('span');
        tag.className = 'editor-tag';
        tag.innerHTML = `
            ${tagText}
            <button onclick="this.parentElement.remove()">×</button>
        `;
        container.insertBefore(tag, container.querySelector('input'));
    }
}
    // Content Loading
    loadCurrentContent() {
        fetch('/api/content')
            .then(response => response.json())
            .then(content => {
                this.state.currentContent = content;
                this.populateEditors(content);
            })
            .catch(error => this.showNotification('Error loading content', 'error'));
    },

    // Editor Population
    populateEditors(content) {
        // Hero Section
        document.getElementById('heroTitle').value = content.hero?.title || '';
        document.getElementById('heroSubtitle').value = content.hero?.subtitle || '';
        document.getElementById('heroVideo').value = content.hero?.videoUrl || '';
        document.getElementById('heroCta').value = content.hero?.ctaText || '';

        // Stats Section
        this.populateStats(content.stats);

        // Builds Section
        this.populateBuilds(content.builds);
    },

    // Stats Management
    populateStats(stats) {
        const container = document.getElementById('statsContainer');
        container.innerHTML = '';
        
        stats?.forEach(stat => {
            this.addStatEntry(stat);
        });
    },

    addStatEntry(stat = {}) {
        const container = document.getElementById('statsContainer');
        const entry = document.createElement('div');
        entry.className = 'stat-entry';
        entry.innerHTML = `
            <input type="text" class="editor-input" placeholder="Stat Number" value="${stat.number || ''}">
            <input type="text" class="editor-input" placeholder="Stat Label" value="${stat.label || ''}">
            <button class="editor-button" onclick="CMS.removeEntry(this.parentElement)">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(entry);
    },

    // Builds Management
    populateBuilds(builds) {
        const container = document.getElementById('buildsContainer');
        container.innerHTML = '';
        
        builds?.forEach(build => {
            this.addVehicleEntry(build);
        });
    },

    addVehicleEntry(build = {}) {
        const container = document.getElementById('buildsContainer');
        const entry = document.createElement('div');
        entry.className = 'vehicle-entry';
        entry.innerHTML = `
            <input type="text" class="editor-input" placeholder="Vehicle Title" value="${build.title || ''}">
            <div class="image-upload">
                <label class="editor-label">Vehicle Image</label>
                <input type="file" accept="image/*" class="editor-input">
                ${build.imageUrl ? `<div class="image-preview" style="background-image: url(${build.imageUrl})"></div>` : ''}
            </div>
            <textarea class="editor-input" placeholder="Vehicle Description" rows="4">${build.description || ''}</textarea>
            <div class="specs-container">
                <input type="text" class="editor-input" placeholder="Engine" value="${build.specs?.engine || ''}">
                <input type="text" class="editor-input" placeholder="Transmission" value="${build.specs?.transmission || ''}">
                <input type="text" class="editor-input" placeholder="Suspension" value="${build.specs?.suspension || ''}">
            </div>
            <div class="tag-container">
                <input type="text" class="editor-input" placeholder="Tags (comma separated)" value="${build.tags?.join(', ') || ''}">
            </div>
            <button class="editor-button" onclick="CMS.removeEntry(this.parentElement)">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(entry);
    },

    // Utility Functions
    removeEntry(element) {
        element.remove();
        this.state.unsavedChanges = true;
        this.showNotification('Entry removed');
    },

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `editor-notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 3000);
    },

    // Save & Preview Functions
    saveChanges() {
        const content = this.collectContent();
        
        fetch('/api/content', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(content)
        })
        .then(response => {
            if (response.ok) {
                this.state.unsavedChanges = false;
                this.showNotification('Changes saved successfully!');
            }
        })
        .catch(error => this.showNotification('Error saving changes', 'error'));
    },

    togglePreview() {
        const previewFrame = document.getElementById('previewFrame');
        previewFrame.contentWindow.postMessage(this.collectContent(), '*');
    },

    collectContent() {
        return {
            hero: {
                title: document.getElementById('heroTitle').value,
                subtitle: document.getElementById('heroSubtitle').value,
                videoUrl: document.getElementById('heroVideo').value,
                ctaText: document.getElementById('heroCta').value
            },
            stats: Array.from(document.querySelectorAll('.stat-entry')).map(entry => ({
                number: entry.querySelector('input:first-child').value,
                label: entry.querySelector('input:last-child').value
            })),
            builds: Array.from(document.querySelectorAll('.vehicle-entry')).map(entry => ({
                title: entry.querySelector('input[placeholder="Vehicle Title"]').value,
                imageUrl: entry.querySelector('.image-preview')?.style.backgroundImage.slice(5, -2) || '',
                description: entry.querySelector('textarea').value,
                specs: {
                    engine: entry.querySelector('input[placeholder="Engine"]').value,
                    transmission: entry.querySelector('input[placeholder="Transmission"]').value,
                    suspension: entry.querySelector('input[placeholder="Suspension"]').value
                },
                tags: entry.querySelector('input[placeholder="Tags (comma separated)"]').value.split(',').map(tag => tag.trim())
            }))
        };
    }
};

// Initialize CMS when document is ready
document.addEventListener('DOMContentLoaded', () => CMS.init());
