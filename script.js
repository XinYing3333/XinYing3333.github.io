// set-theme.js (必須放在 HTML head 最前面引入)
(function () {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const savedTheme = localStorage.getItem('theme') || systemTheme;
    document.documentElement.setAttribute('data-theme', savedTheme);
})();

// main.js (放在 body 底部或 DOMContentLoaded 裡)
document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('ready');

    // 平滑滾動到錨點
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 導航欄高亮當前頁面
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar a');
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 主題切換按鈕
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = currentTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        requestAnimationFrame(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        });
    });

    // 作品點擊導向
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const gameTitle = item.querySelector('h3').textContent;
            const gameDescription = item.querySelector('p').textContent;
            const gameImage = item.querySelector('img').src;
            const params = new URLSearchParams();
            params.append('title', gameTitle);
            params.append('description', gameDescription);
            params.append('image', gameImage);
            window.location.href = `game-template.html?${params.toString()}`;
        });
    });

    // Resize 控制 navbar
    const navbar = document.querySelector('.navbar');
    function handleResize() {
        const isMobile = window.innerWidth < 768;
        if (!isMobile) navbar.classList.add('active');
        else navbar.classList.remove('active');
    }
    handleResize();
    window.addEventListener('resize', handleResize);

    // 回到頂部按鈕
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) backToTopButton.classList.add('visible');
        else backToTopButton.classList.remove('visible');
    });

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 初始淡入動畫
    if (!document.body.classList.contains('intro-page')) {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    }

    // 視差滾動
    const featuredItems = document.querySelectorAll('.featured-item');
    window.addEventListener('scroll', () => {
        featuredItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const scrollPosition = window.scrollY;
            const itemPosition = rect.top + scrollPosition;
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight && rect.bottom > 0) {
                const speed = 0.1;
                const yPos = -(scrollPosition - itemPosition) * speed;
                item.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

    // 滾動動畫出現
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.featured-item, .portfolio-item');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.featured-item, .portfolio-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});
