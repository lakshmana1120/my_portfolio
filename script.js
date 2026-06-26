/**
 * Lakshmanakumar M - Portfolio Website JavaScript
 * Implements interactive features, theme toggle, project filtering, modal dialogs,
 * contact form validation, toast alerts, scroll-triggered highlights and typewriter effects.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. DATA STORES (Project details for Modals)
    // ==========================================================================
    const projectDetails = {
        'vendor-invoice': {
            title: 'Vendor Invoice Management System',
            category: 'Web Application (Laravel)',
            purpose: 'I developed this web application to simplify and automate vendor invoice processing and sales transactions. The goal was to replace slow, manual paper records with a centralized digital dashboard.',
            bullets: [
                'Developed vendor invoice, sales transaction, and vendor management modules using Laravel and integrated them with a MySQL database.',
                'Implemented PDF and Excel export functionality with barcode generation, enabling users to generate and download business reports.',
                'Designed multiple invoice print layouts (Original, Duplicate, and Triplicate) based on business requirements.',
                'Participated in testing, bug fixing, and feature enhancements while collaborating with senior developers during the internship.'
            ],
            implementation: 'For this system, I designed the complete database schema in MySQL to manage vendor accounts, sales invoices, and ledger records. I used Laravel\'s Eloquent ORM for handling relations and wrote clean controller logic to process invoice submissions. To handle physical scanning, I integrated a barcode generation package that prints unique validation codes on every invoice PDF. I also spent a lot of time designing print-friendly CSS layouts so users could print original, duplicate, and triplicate invoices directly from the browser, and set up fast Excel export flows using Laravel Excel.',
            stack: 'Laravel (PHP), MySQL, Git'
        },
        'gmp-audit': {
            title: 'Food Safety GMP Audit Application',
            category: 'Web Application (Laravel)',
            purpose: 'I created this audit management system to digitize food safety inspections and Good Manufacturing Practices (GMP) audits. It allows organizations to schedule audits and track compliance logs.',
            bullets: [
                'Developed backend modules for audit scheduling, audit observations, and corrective action management using Laravel.',
                'Implemented role-based authentication and user permission management to provide secure access for different user roles.',
                'Created REST APIs and optimized database queries to improve application performance and data retrieval.',
                'Designed real-time dashboards to monitor audit and rectification progress, increasing visibility for management teams.',
                'Worked on bug fixing, feature enhancements, and testing to ensure smooth functionality before deployment.'
            ],
            implementation: 'I built the core framework of this application using Laravel. I designed a custom role-based access control (RBAC) system from scratch, ensuring that inspectors, supervisors, and administrative staff only saw relevant audit screens. I created tables for audit checklists, observation logs, and corrective actions. One of the challenging parts was building the interactive admin dashboard; I wrote optimized SQL aggregation queries to group audit scores and compliance progress, showing real-time charts. I also built API endpoints to allow inspectors to submit checklists from the field without lag.',
            stack: 'Laravel (PHP), MySQL, Git'
        },
        'hse-app': {
            title: 'Health and Safety Environment Application',
            category: 'Mobile & Web Application (Flutter & Laravel)',
            purpose: 'I built this application to modernize workplace safety inspections. The solution allows field inspectors to fill out safety checklists on their mobile devices and upload findings in real time.',
            bullets: [
                'Developed REST APIs in Laravel and integrated them with the Flutter mobile application for seamless data communication.',
                'Built mobile screens for safety checklists, inspection forms, remarks, and verification workflows using Flutter.',
                'Designed and maintained MySQL database structures using Eloquent ORM to manage inspection and user data.',
                'Performed application testing, resolved reported issues, and implemented new requirements based on client feedback.'
            ],
            implementation: 'I developed this project as a full-stack solution. On the mobile side, I used Flutter to create a responsive, fluid checklist interface for inspectors on the move. On the backend, I built a secure RESTful API suite in Laravel, protecting endpoints with Sanctum tokens. I set up database tables in MySQL for safety compliance records. A major focus was implementing seamless image uploading, allowing users to take photos of safety hazards on their mobile camera and upload them to the server through Laravel multipart-form requests.',
            stack: 'Laravel (PHP), Flutter (Dart), MySQL, Git'
        },
        'dispatch-app': {
            title: 'Dispatch Verification Application',
            category: 'Mobile Application (Flutter)',
            purpose: 'I built this mobile application to minimize human errors during warehouse dispatching. It enables workers to instantly cross-check shipment barcodes against invoice details before loading cargo.',
            bullets: [
                'Designed responsive mobile screens and layouts with Flutter for dispatch workers.',
                'Integrated package barcode scanners to verify dispatch records against database rows.',
                'Built backend REST API endpoints to fetch, match, and validate parcel serial numbers.',
                'Implemented local storage checks and toast messages to warn packers about incorrect shipments.',
                'Conducted debugging, testing, and system tuning to guarantee scan accuracy.'
            ],
            implementation: 'I built this Flutter application specifically for high-speed barcode validation in warehouses. I integrated the mobile device\'s camera using barcode scanning libraries, optimizing the scan speed for rapid picking. I connected the app to our central API endpoints to download dispatch order sheets. To handle poor internet coverage in basement warehouse bays, I built local state checks using SQLite, validating scans instantly offline. If a worker scans an item that isn\'t part of the target shipping list, the app triggers a large visual error screen and plays an alert sound to immediately flag the mistake.',
            stack: 'Flutter (Dart), REST API, Barcode Scanner, Git'
        },
        'route-survey': {
            title: 'NTC Route Survey Application',
            category: 'Mobile Application (Flutter)',
            purpose: 'I developed this mobile tool for logistics teams to survey cargo transportation routes. The app logs GPS positions, captures obstacle images, and maps safe paths for heavy transport.',
            bullets: [
                'Developed the Flutter mobile application with Google Maps integration for route navigation and survey data collection.',
                'Implemented obstacle recording with image capture, GPS coordinates, and detailed survey information for logistics teams.',
                'Designed offline data storage using SQLite and implemented automatic synchronization when network connectivity was restored.',
                'Integrated REST APIs with the backend system and worked on performance improvements, testing, and bug fixes.'
            ],
            implementation: 'I was the lead developer for this mobile survey app. I integrated the Google Maps Flutter SDK, enabling surveyors to drag-and-drop map markers to plot height clearances, low bridges, and sharp bends. Because logistics routes go through remote zones with no signal, I designed an offline database schema with SQLite to store mapped coordinates and captured photos locally. I then wrote custom background synchronization jobs in Dart that check for network availability and upload all saved survey logs to the Laravel backend as soon as they get a signal.',
            stack: 'Flutter (Dart), SQLite, Google Maps API, RESTful APIs, Git'
        },
        'driver-app': {
            title: 'NTC Driver Application',
            category: 'Mobile & Web Application (Flutter & Laravel)',
            purpose: 'I developed this management application to track driver attendance and trip expenses. It provides a secure, digital portal to replace manual paper receipts and cash request logs.',
            bullets: [
                'Developed attendance management and trip expense modules using Flutter and Laravel.',
                'Integrated Python-based face detection with the Laravel backend for secure driver attendance verification.',
                'Implemented OTP-based login authentication and developed APIs for communication between mobile and backend systems.',
                'Added image upload functionality for expense records and participated in testing, bug fixing, and feature improvements.'
            ],
            implementation: 'This was an exciting integration project. I built the mobile application in Flutter for drivers to log expenses, check trip sheets, and upload receipt photos. To secure attendance logging, I integrated Python face detection. When a driver registers, the app captures their photo and sends it to our Laravel API, which proxies it to a Python script using facial feature comparison to verify identity. I also set up a secure mobile sign-in flow utilizing SMS OTP validation and designed receipt image upload APIs that compress images before storing them to save server space.',
            stack: 'Laravel (PHP), Python (Face Detection), Flutter (Dart), SQLite, RESTful APIs, Git'
        },
        'ip-ring': {
            title: 'IP RING (SCM) — Warehouse & Dispatch Management System',
            category: 'Mobile Application (Flutter)',
            purpose: 'I developed this mobile client for a warehouse and supply chain management system to handle packing, picking, and dispatch workflows. It provides real-time warehouse inventory tracking.',
            bullets: [
                'Developed Flutter modules for packing, picklist management, inventory scanning, and dispatch operations based on warehouse workflows.',
                'Implemented QR code scanning functionality to track inventory movement and improve product traceability throughout the warehouse.',
                'Integrated the mobile application with backend REST APIs to synchronize warehouse data in real time with the web application.',
                'Worked closely with the development team to test new features, resolve reported issues, and enhance application performance.'
            ],
            implementation: 'I developed this mobile client using Flutter to optimize warehouse picklists and inventory tracking. I integrated a fast QR scanner using mobile camera packages to track inventory moves in real-time. I wrote mobile services to map invoices and process dispatch items, interacting directly with a Frappe/ERPNext backend via REST APIs. To ensure the app remains fully functional in concrete-shielded warehouse sectors, I implemented a local SQLite database that caches picklists and packages, syncing changes back as soon as connection is re-established.',
            stack: 'Python (Frappe Framework), Flutter (Dart), SQLite, RESTful APIs, Git'
        },
        'erpnext-impl': {
            title: 'ERPNext Implementation for Manufacturing Industry',
            category: 'ERP Implementation (ERPNext)',
            purpose: 'I customized and configured ERPNext for a manufacturing business. The objective was to consolidate CRM, sales, purchases, inventory tracking, and manufacturing under a single, unified database.',
            bullets: [
                'Configured ERPNext modules for CRM, Sales, Purchase, Inventory, and Manufacturing.',
                'Designed custom workflows, print formats, and document lifecycles based on business needs.',
                'Set up API integrations between ERPNext backend and Flutter warehouse clients.',
                'Migrated legacy data securely to the MariaDB database and optimized indexing.',
                'Trained team users on production modules and resolved daily system issues.'
            ],
            implementation: 'I led the customization and setup of ERPNext. I worked closely with production leads to map out manufacturing workflows, from raw material procurement to product finishing. I customized standard ERPNext DocTypes and created client/server-side scripts in Python and JavaScript to automate material requisitions. I also designed printable sales orders and invoices using HTML/CSS templates within the Jinja templating system, and optimized MariaDB database indexing to handle reports and transactions without slowdowns.',
            stack: 'ERPNext, Frappe Framework, Python, JavaScript, MariaDB, REST APIs, Linux, Git'
        }
    };

    // ==========================================================================
    // 2. THEME SWITCHER
    // ==========================================================================
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const body = document.body;

    // Load saved theme or check preferences
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        body.className = savedTheme;
    } else {
        // Default to dark theme
        body.className = 'dark-theme';
        localStorage.setItem('portfolio-theme', 'dark-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('portfolio-theme', 'light-theme');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('portfolio-theme', 'dark-theme');
        }
    });

    // ==========================================================================
    // 3. TYPEWRITER EFFECT
    // ==========================================================================
    const typewriterTxt = document.getElementById('typewriterTxt');
    const roles = ['Full Stack Developer', 'Flutter Developer', 'Laravel Developer', 'ERPNext Consultant'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function handleTypewriter() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterTxt.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster when deleting
        } else {
            typewriterTxt.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // normal typing
        }

        // Handle states transition
        if (!isDeleting && charIndex === currentRole.length) {
            // Finished typing, wait before deleting
            isDeleting = true;
            typingSpeed = 1500; 
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next role
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // wait briefly before starting next role
        }

        setTimeout(handleTypewriter, typingSpeed);
    }
    
    // Start typewriter loop
    handleTypewriter();

    // ==========================================================================
    // 4. MOBILE NAVIGATION MENU
    // ==========================================================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Header scroll background change
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // 5. OBJECTIVES TABS SYSTEM
    // ==========================================================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Set active button
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Set active pane
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `pane-${targetTab}`) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // ==========================================================================
    // 6. PORTFOLIO FILTERING
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            // Set active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter project cards
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // ==========================================================================
    // 7. PROJECT DETAILS MODAL
    // ==========================================================================
    const projectModal = document.getElementById('projectModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const exploreButtons = document.querySelectorAll('.btn-card-details');

    function openModal(projectId) {
        const data = projectDetails[projectId];
        if (!data) return;

        // Construct HTML content
        modalContent.innerHTML = `
            <h3>${data.title}</h3>
            
            <div class="modal-section">
                <div class="modal-section-title">Category</div>
                <p>${data.category}</p>
            </div>
            
            <div class="modal-section">
                <div class="modal-section-title">Purpose & Goals</div>
                <p>${data.purpose}</p>
            </div>
            
            <div class="modal-section">
                <div class="modal-section-title">Key Accomplishments & Responsibilities</div>
                <ul class="modal-bullets-list">
                    ${data.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                </ul>
            </div>
            
            <div class="modal-section">
                <div class="modal-section-title">Implementation Details</div>
                <p>${data.implementation}</p>
            </div>
            
            <div class="modal-section">
                <div class="modal-section-title">Technologies Used</div>
                <div class="project-tags" style="margin-top: 8px;">
                    ${data.stack.split(', ').map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
            </div>
        `;

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Disable page scrolling
        projectModal.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore page scrolling
        projectModal.setAttribute('aria-hidden', 'true');
    }

    // Attach events to cards
    exploreButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    // Close options
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeModal();
        }
    });

    // ==========================================================================
    // 8. CONTACT FORM VALIDATION & TOAST ALERT
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('submitToast');
    const toastMessage = document.getElementById('toastMessage');

    const inputs = {
        name: {
            el: document.getElementById('contactName'),
            err: document.getElementById('nameError'),
            validate: val => val.trim().length > 0
        },
        email: {
            el: document.getElementById('contactEmail'),
            err: document.getElementById('emailError'),
            validate: val => {
                const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(val.trim());
            }
        },
        subject: {
            el: document.getElementById('contactSubject'),
            err: document.getElementById('subjectError'),
            validate: val => val.trim().length > 0
        },
        message: {
            el: document.getElementById('contactMessage'),
            err: document.getElementById('messageError'),
            validate: val => val.trim().length > 0
        }
    };

    // Realtime error removal on input
    Object.keys(inputs).forEach(key => {
        const inputObj = inputs[key];
        inputObj.el.addEventListener('input', () => {
            if (inputObj.validate(inputObj.el.value)) {
                inputObj.el.parentElement.classList.remove('has-error');
            }
        });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isFormValid = true;

        // Check each input
        Object.keys(inputs).forEach(key => {
            const inputObj = inputs[key];
            const value = inputObj.el.value;
            const isValid = inputObj.validate(value);

            if (!isValid) {
                inputObj.el.parentElement.classList.add('has-error');
                isFormValid = false;
            } else {
                inputObj.el.parentElement.classList.remove('has-error');
            }
        });

        if (isFormValid) {
            // Trigger toast
            toastMessage.textContent = `Thank you, ${inputs.name.el.value}! Your message has been sent successfully.`;
            toast.classList.add('show');

            // Reset Form
            contactForm.reset();

            // Hide toast after 4s
            setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        }
    });

    // ==========================================================================
    // 9. SCROLL REVEAL / NAV LINK ACTIVE HIGHLIGHTS
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavMenu() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120; // offset for header
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavMenu);

    // ==========================================================================
    // 10. BACKGROUND BLOB GLOW INTERACTIVE MOVEMENT
    // ==========================================================================
    const blob1 = document.getElementById('blobGlow1');
    const blob2 = document.getElementById('blobGlow2');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Slightly move blobs based on mouse offset to feel "alive"
        const moveX1 = (mouseX - window.innerWidth / 2) * 0.04;
        const moveY1 = (mouseY - window.innerHeight / 2) * 0.04;
        
        const moveX2 = (mouseX - window.innerWidth / 2) * -0.03;
        const moveY2 = (mouseY - window.innerHeight / 2) * -0.03;

        if (blob1) {
            blob1.style.transform = `translate(${moveX1}px, ${moveY1}px)`;
        }
        if (blob2) {
            blob2.style.transform = `translate(${moveX2}px, ${moveY2}px)`;
        }
    });

    // ==========================================================================
    // 11. PORTFOLIO CUSTOMIZER DRAWER & ACTIONS
    // ==========================================================================
    const customizerToggleBtn = document.getElementById('customizerToggleBtn');
    const customizerDrawer = document.getElementById('customizerDrawer');
    const customizerCloseBtn = document.getElementById('customizerCloseBtn');
    const customizerOverlay = document.getElementById('customizerOverlay');
    const customPhotoInput = document.getElementById('customPhotoInput');
    const customResumeInput = document.getElementById('customResumeInput');
    const photoNameDisplay = document.getElementById('photoNameDisplay');
    const resumeNameDisplay = document.getElementById('resumeNameDisplay');
    const avatarImg = document.getElementById('avatarImg');
    const resumeLinks = [document.getElementById('btnResumeNav'), document.getElementById('btnHeroResume')];

    function openCustomizer() {
        customizerDrawer.classList.add('active');
        customizerDrawer.setAttribute('aria-hidden', 'false');
    }

    function closeCustomizer() {
        customizerDrawer.classList.remove('active');
        customizerDrawer.setAttribute('aria-hidden', 'true');
    }

    if (customizerToggleBtn) {
        customizerToggleBtn.addEventListener('click', openCustomizer);
    }
    if (customizerCloseBtn) {
        customizerCloseBtn.addEventListener('click', closeCustomizer);
    }
    if (customizerOverlay) {
        customizerOverlay.addEventListener('click', closeCustomizer);
    }

    // Photo input selection handler
    if (customPhotoInput) {
        customPhotoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                photoNameDisplay.textContent = file.name;

                // Live preview using FileReader
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (avatarImg) {
                        avatarImg.src = event.target.result;
                    }
                };
                reader.readAsDataURL(file);
            } else {
                photoNameDisplay.textContent = "No file chosen";
            }
        });
    }

    // Resume input selection handler
    if (customResumeInput) {
        customResumeInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                resumeNameDisplay.textContent = file.name;

                // Create object URL for the uploaded PDF
                const resumeUrl = URL.createObjectURL(file);

                // Update all download resume elements to use this local URL
                resumeLinks.forEach(link => {
                    if (link) {
                        link.href = resumeUrl;
                        link.download = file.name; // Keep original filename for download
                    }
                });
            } else {
                resumeNameDisplay.textContent = "No file chosen";
            }
        });
    }
});
