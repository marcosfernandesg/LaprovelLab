        // Mobile Menu Toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
        });

        // Tab functionality
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and contents
                document.querySelectorAll('.tab-button').forEach(btn => {
                    btn.classList.remove('active', 'text-blue-600', 'border-blue-600');
                    btn.classList.add('text-gray-600');
                });
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active', 'text-blue-600', 'border-blue-600');
                this.classList.remove('text-gray-600');
                document.getElementById(targetTab).classList.add('active');
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            });
        });

        // Loading animation observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.loading-animation').forEach(el => {
            observer.observe(el);
        });

        // Navbar background change on scroll
        let lastScrollTop = 0;
        const navbar = document.querySelector('nav');
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            }

            // Back to top button visibility
            const backToTopBtn = document.getElementById('backToTop');
            if (scrollTop > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible');
                backToTopBtn.classList.add('opacity-100', 'visible');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible');
                backToTopBtn.classList.remove('opacity-100', 'visible');
            }

            lastScrollTop = scrollTop;
        });

        // Back to top functionality
        document.getElementById('backToTop').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Form submission (simulate)
        document.querySelector('.appointment-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            // Show loading state
            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
            button.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check mr-2"></i>Mensagem Enviada!';
                button.classList.remove('btn-gradient');
                button.classList.add('bg-green-500');
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.classList.add('btn-gradient');
                    button.classList.remove('bg-green-500');
                    this.reset();
                }, 2000);
            }, 1500);
        });

        // Newsletter form submission
        document.querySelector('footer form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Inscrevendo...';
            button.disabled = true;
            
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check mr-2"></i>Inscrito!';
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    this.reset();
                }, 2000);
            }, 1000);
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Counter animation
        function animateCounters() {
            const counters = document.querySelectorAll('.stats-counter');
            
            counters.forEach(counter => {
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current) + (counter.textContent.includes('%') ? '%' : counter.textContent.includes('+') ? '+' : '');
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = counter.textContent;
                    }
                };
                
                updateCounter();
            });
        }

        // Trigger counter animation when hero section is visible
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateCounters, 500);
                    heroObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });

        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroObserver.observe(heroSection);
        }

        // Add typing effect to hero title
        function typeWriter(element, text, speed = 50) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing effect
        window.addEventListener('load', function() {
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                const originalText = heroTitle.textContent;
                setTimeout(() => {
                    typeWriter(heroTitle, originalText, 30);
                }, 1000);
            }
        });

        // Add hover effect to service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                const icon = this.querySelector('.feature-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                const icon = this.querySelector('.feature-icon i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });