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
            purpose: 'Developed to simplify vendor invoice processing and business transaction management. It helps users generate invoices, maintain digital records, and export reports for auditing and operational purposes.',
            implementation: 'Developed backend modules using Laravel and MySQL for invoice creation, transaction storage, and record management. Implemented barcode generation, PDF/Excel export functionality, and advanced invoice search and filtering features.',
            stack: 'Laravel, PHP, MySQL, Git, HTML5, CSS3, JavaScript'
        },
        'gmp-audit': {
            title: 'Food Safety GMP Audit Application',
            category: 'Web Application (Laravel)',
            purpose: 'Designed to digitize food safety audit activities and improve compliance management. The system enables organizations to record audit findings, assign corrective actions, and monitor closure status efficiently.',
            implementation: 'Developed audit management modules, role-based authentication (RBAC), and workflow tracking using Laravel. Built interactive dashboards and reporting features to provide high-level visibility into audit progress and corrective actions.',
            stack: 'Laravel, PHP, MySQL, Git, JavaScript, CSS3'
        },
        'hse-app': {
            title: 'Health and Safety Environment Application',
            category: 'Mobile Application (Flutter)',
            purpose: 'Helps organizations perform safety inspections and checklist verification through a digital platform. It enables users to submit inspection records and maintain compliance documentation efficiently.',
            implementation: 'Developed Flutter-based mobile interfaces and integrated Laravel REST APIs for checklist submission workflows. Implemented client-side validation and real-time communication between mobile and backend systems.',
            stack: 'Flutter, Laravel (REST API), MySQL, Dart'
        },
        'dispatch-app': {
            title: 'Dispatch Verification Application',
            category: 'Mobile Application (Flutter)',
            purpose: 'Developed to improve shipment validation and reduce dispatch errors. Users can verify shipment details instantly through barcode scanning before dispatch operations.',
            implementation: 'Developed a Flutter mobile application with high-speed barcode scanning functionality and backend API integration. Implemented authentication, shipment validation workflows, and comprehensive error handling mechanisms.',
            stack: 'Flutter, REST API, Barcode Scanner, Dart'
        },
        'route-survey': {
            title: 'NTC Route Survey Application',
            category: 'Mobile Application (Flutter)',
            purpose: 'Assists logistics teams in surveying transportation routes before cargo movement. It enables users to identify obstacles, capture photos, and record route information even in offline environments.',
            implementation: 'Developed a Flutter mobile application with Google Maps integration and offline storage using SQLite. Implemented obstacle marking, image capture, and automatic synchronization with backend services when connection becomes available.',
            stack: 'Flutter, SQLite, Google Maps API, REST API, Dart'
        },
        'driver-app': {
            title: 'NTC Driver Application',
            category: 'Mobile Application (Flutter)',
            purpose: 'Developed to manage driver attendance verification and trip expense tracking through a single mobile platform. It improves operational efficiency through secure attendance validation and expense management.',
            implementation: 'Built Flutter modules for attendance tracking, expense entry, and image uploads. Integrated Laravel APIs, SQLite offline storage, OTP authentication, and Python-based face recognition integration.',
            stack: 'Flutter, Laravel, SQLite, Python Face Detection, REST API, Dart'
        },
        'ip-ring': {
            title: 'IP RING (SCM) – Warehouse & Dispatch Management System',
            category: 'Mobile Application (Flutter)',
            purpose: 'IP RING is a warehouse and supply chain management solution designed to manage inventory movement, packing operations, picklist processing, invoice mapping, and dispatch activities. The system improves operational accuracy through real-time tracking.',
            implementation: 'Developed Flutter modules for packing, QR code scanning, inventory tracking, invoice mapping, and dispatch workflows. Integrated mobile applications with backend APIs (Frappe Framework) and implemented robust offline synchronization logic.',
            stack: 'Flutter, Frappe Framework, SQLite, REST API, QR Scanner, Dart'
        },
        'erpnext-impl': {
            title: 'ERPNext Implementation for Manufacturing Industry',
            category: 'Web Application (ERPNext)',
            purpose: 'Implemented ERPNext for a manufacturing organization to automate and manage business processes across CRM, Sales, Purchase, Inventory, and Manufacturing departments.',
            implementation: 'Collaborated with stakeholders to gather requirements, configured ERPNext modules, customized workflows, conducted user training, and provided implementation support.',
            stack: 'ERPNext, Frappe Framework, Python, JavaScript, MariaDB, HTML, CSS, REST APIs, Linux, Git'
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
                <div class="modal-section-title">Key Implementation</div>
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
