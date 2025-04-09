// 平滑滾動到錨點
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 導航欄高亮當前頁面
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
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

document.addEventListener('DOMContentLoaded', function() {
    // 初始化設置
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // 設置主題
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // 創建主題切換按鈕
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = savedTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    document.body.appendChild(themeToggle);

    // 主題切換邏輯
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        requestAnimationFrame(() => {
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        });
    });

    // 作品區塊點擊事件
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

    // 監聽視窗大小變化
    function handleResize() {
        const isMobile = window.innerWidth < 768;
        if (!isMobile) {
            navbar.classList.add('active');
        } else {
            navbar.classList.remove('active');
        }
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    // 回到頂部按鈕功能
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    document.body.appendChild(backToTopButton);

    // 監聽滾動事件
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // 點擊回到頂部
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 添加頁面載入動畫
    if (!document.body.classList.contains('intro-page')) {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    }

    // 添加滾動視差效果
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
});

// 添加滾動動畫效果
const animateOnScroll = function() {
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

// 初始化元素樣式
document.querySelectorAll('.featured-item, .portfolio-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
});

// 監聽滾動事件
window.addEventListener('scroll', animateOnScroll);
// 初始執行一次
animateOnScroll();