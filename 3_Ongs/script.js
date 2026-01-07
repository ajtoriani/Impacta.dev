document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. MENU MOBILE (COM TRAVA DE SCROLL NO BODY) ===
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a'); // Pega os links E o botão

    // Função para abrir/fechar
    function toggleMenu() {
        const isOpening = !navMenu.classList.contains('active');
        
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('open');
        
        if (isOpening) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }

    // Evento no botão hambúrguer
    mobileToggle.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
    
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });


    // 2. NAVBAR SCROLL
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. FAQ
    const accordions = document.querySelectorAll('.accordion-item');
    accordions.forEach(item => {
        const btn = item.querySelector('.accordion-header');
        btn.addEventListener('click', () => {
            accordions.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // 4. GSAP & PARALLAX 
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Fade in inicial
        gsap.from(".js-anim", {
            y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.2
        });

        // Fade in das seções
        gsap.utils.toArray('.js-scroll-fade').forEach(el => {
            gsap.from(el, {
                y: 50, opacity: 0, duration: 1, 
                scrollTrigger: { trigger: el, start: "top 85%" }
            });
        });

        // PARALLAX DOS SHAPES E CARDS
        gsap.utils.toArray('.js-scroll-float').forEach(el => {
            const speed = el.dataset.speed || 0.5;
            gsap.to(el, {
                y: -50 * speed, 
                ease: "none",
                scrollTrigger: {
                    trigger: el.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }
});