// Main JavaScript for TECHNOVATION 2K25

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        once: false,
        mirror: true
    });
    
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
    
    // Custom cursor - only for desktop
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    // Check if we're on desktop (not touch device)
    if (window.innerWidth > 992 && !('ontouchstart' in window)) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
    }
    
    document.addEventListener('mousedown', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.2)';
    });
    
    document.addEventListener('mouseup', function() {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Add hover effect for links and buttons
    const links = document.querySelectorAll('a, button, .event-card, .info-card, .timeline-item');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '1px solid var(--primary)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        link.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--primary)';
            cursor.style.border = 'none';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Ensure header is visible when menu is open
        if (navLinks.classList.contains('active')) {
            header.classList.remove('header-hidden');
        }
    });
    
    // Menu toggle button to show header
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            header.classList.remove('header-hidden');
            setTimeout(() => {
                hamburger.classList.add('active');
                navLinks.classList.add('active');
            }, 300);
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            // First close the menu
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            
            // Check if the link is an anchor link
            if(this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if(targetSection) {
                    // Allow time for menu to close before scrolling
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            }
        });
    });
    
    // Header scroll effect with hide/show functionality
    const header = document.querySelector('header');
    
    // Variables to track scroll direction
    let lastScrollTop = 0;
    let scrollTimeout;
    
    // Function to check if mobile menu is open
    function checkMenuState() {
        return document.querySelector('.nav-links').classList.contains('active');
    }
    
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const isMenuOpen = checkMenuState();
                
                // Don't hide header if mobile menu is open or at the very top of the page
                if (isMenuOpen) {
                    header.classList.remove('header-hidden');
                } else {
                    // Keep header hidden except when at the very top
                    if (scrollTop > 10) {
                        // Not at the top - hide header
                        header.classList.add('header-hidden');
                    } else {
                        // At the top - show header
                        header.classList.remove('header-hidden');
                    }
                }
                
                // Add scrolled class for styling when not at the top
                if (scrollTop > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
                scrollTimeout = null;
            }, 100);
        }
    });
    
    // Countdown Timer
    const countdownDate = new Date('September 27, 2025 00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        if (distance < 0) {
            document.getElementById('days').innerHTML = '00';
            document.getElementById('hours').innerHTML = '00';
            document.getElementById('minutes').innerHTML = '00';
            document.getElementById('seconds').innerHTML = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerHTML = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerHTML = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerHTML = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerHTML = seconds < 10 ? '0' + seconds : seconds;
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // Scroll down button
    const scrollDown = document.querySelector('.scroll-down');
    
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Throttle scroll events for better performance
        let backToTopTimeout;
        window.addEventListener('scroll', function() {
            if (!backToTopTimeout) {
                backToTopTimeout = setTimeout(function() {
                    if (window.scrollY > 300) {
                        backToTopBtn.classList.add('show');
                    } else {
                        backToTopBtn.classList.remove('show');
                    }
                    backToTopTimeout = null;
                }, 150);
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Events tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const eventCards = document.querySelectorAll('.event-cards');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all event cards
            eventCards.forEach(card => card.classList.remove('active'));
            // Show corresponding event cards
            document.getElementById(this.dataset.tab).classList.add('active');
        });
    });
    
    // Parallax effect
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        document.querySelectorAll('section').forEach((section, index) => {
            const offset = section.offsetTop;
            const height = section.offsetHeight;
            
            if (scrollY > offset - window.innerHeight && scrollY < offset + height) {
                // Apply parallax effect to elements in view
                section.style.backgroundPositionY = (scrollY - offset) * 0.1 + 'px';
            }
        });
    });
    
    // Modals
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const modalBtn = document.querySelector('.modal-btn');
    const modals = document.querySelectorAll('.modal');
    
    // Event details modals
    const learnMoreLinks = document.querySelectorAll('.learn-more[data-modal]');
    
    learnMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });
    
    // Close modal buttons
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close button in modals
    const modalCloseButtons = document.querySelectorAll('.modal-close-btn');
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    if (modalBtn) {
        modalBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Particle background effect (using Three.js)
    function initParticles() {
        if (typeof THREE === 'undefined') return;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        
        // Add to hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.appendChild(renderer.domElement);
            renderer.domElement.style.position = 'absolute';
            renderer.domElement.style.top = '0';
            renderer.domElement.style.left = '0';
            renderer.domElement.style.zIndex = '1';
            renderer.domElement.style.pointerEvents = 'none';
        }
        
        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCnt = 1500;
        
        const posArray = new Float32Array(particlesCnt * 3);
        
        for (let i = 0; i < particlesCnt * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 5;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        // Create material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.005,
            color: 0x00f2ff
        });
        
        // Create mesh
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        camera.position.z = 2;
        
        // Animation
        function animate() {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.y += 0.0005;
            particlesMesh.rotation.x += 0.0002;
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    // Initialize particles if Three.js is available
    if (typeof THREE !== 'undefined') {
        initParticles();
    }
    
    // Animate elements on page load
    document.querySelectorAll('.event-card, .timeline-item, .info-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeInUp 0.6s ${index * 0.1}s forwards`;
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Create typing animation for section titles
    function createTypingAnimation() {
        const titles = document.querySelectorAll('.section-title');
        
        titles.forEach(title => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        title.style.animation = 'typing 1s steps(40, end)';
                        observer.unobserve(title);
                    }
                });
            });
            
            observer.observe(title);
        });
    }
    
    // Glitch effect for hero title
    function enhanceGlitchEffect() {
        const glitchElement = document.querySelector('.glitch');
        
        if (glitchElement) {
            setInterval(() => {
                const randomDelay = Math.random() * 0.5;
                const randomDuration = 0.1 + Math.random() * 0.3;
                
                glitchElement.style.animation = `glitch-animation ${randomDuration}s ${randomDelay}s both`;
                
                setTimeout(() => {
                    glitchElement.style.animation = '';
                }, (randomDelay + randomDuration) * 1000);
            }, 3000);
        }
    }
    
    enhanceGlitchEffect();
    
    // Active link highlighting on scroll
    function highlightNavOnScroll() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    highlightNavOnScroll();
    
    // Interactive image hover effect
    document.querySelectorAll('.image-wrapper').forEach(image => {
        image.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            this.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg)`;
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        });
    });
    
    // Animate numbers on scroll
    function animateNumbers() {
        const counters = document.querySelectorAll('.count-number');
        
        counters.forEach(counter => {
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        const increment = target / 100;
                        
                        if (count < target) {
                            counter.innerText = Math.ceil(count + increment);
                            setTimeout(updateCount, 10);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    
                    updateCount();
                    observer.unobserve(counter);
                }
            });
            
            observer.observe(counter);
        });
    }
    
    // Initialize all functions
    createTypingAnimation();
    animateNumbers();
});
