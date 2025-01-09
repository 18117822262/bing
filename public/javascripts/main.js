// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 响应式导航菜单
const navLinks = document.querySelector('.nav-links');
const hamburger = document.createElement('div');
hamburger.classList.add('hamburger');
hamburger.innerHTML = '☰';
document.querySelector('nav').insertBefore(hamburger, navLinks);

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.toggle-btn');
    const header = document.querySelector('header');
    const main = document.querySelector('main');

    toggleBtn.addEventListener('click', function() {
        header.classList.toggle('collapsed');
        main.classList.toggle('expanded');
    });
});

// 详情弹出层功能
document.addEventListener('DOMContentLoaded', function() {
    // 打开弹出层
    document.querySelectorAll('.btn[data-detail]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const detailId = this.getAttribute('data-detail');
            const detailSection = document.getElementById(detailId);
            detailSection.classList.add('active');
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
    });

    // 关闭弹出层
    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', function() {
            const detailSection = this.parentElement;
            detailSection.classList.remove('active');
            document.body.style.overflow = ''; // 恢复背景滚动
        });
    });

    // 点击背景关闭弹出层
    document.querySelectorAll('.detail-section').forEach(section => {
        section.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // 添加 ESC 键关闭功能
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeDetail = document.querySelector('.detail-section.active');
            if (activeDetail) {
                activeDetail.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// 食物轮播功能
document.addEventListener('DOMContentLoaded', function() {
    const foodGrid = document.querySelector('.food-grid');
    const cards = document.querySelectorAll('.food-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const totalCards = cards.length;

    function updateCarousel() {
        const angleStep = 360 / totalCards;
        const radius = 400; // 旋转半径

        cards.forEach((card, index) => {
            // 计算每张卡片相对于当前位置的角度
            let angle = angleStep * (index - currentIndex);
            
            // 确保角度在 -180 到 180 度之间，这样卡片会走最短路径
            if (angle > 180) angle -= 360;
            if (angle < -180) angle += 360;
            
            // 计算3D位置
            const x = Math.sin(angle * Math.PI / 180) * radius;
            const z = Math.cos(angle * Math.PI / 180) * radius;
            
            // 应用变换
            card.style.transform = `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${-angle}deg)`;
            
            // 更新激活状态
            if (index === currentIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }

            // 设置层级，使当前卡片在最上层
            card.style.zIndex = index === currentIndex ? 10 : 1;
        });
    }

    // 初始化
    updateCarousel();

    // 上一张
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    });

    // 下一张
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    });

    // 自动播放
    let autoplayInterval;
    
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        }, 3000);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // 启动自动播放
    startAutoplay();

    // 鼠标进入停止自动播放
    foodGrid.addEventListener('mouseenter', stopAutoplay);
    prevBtn.addEventListener('mouseenter', stopAutoplay);
    nextBtn.addEventListener('mouseenter', stopAutoplay);

    // 鼠标离开恢复自动播放
    foodGrid.addEventListener('mouseleave', startAutoplay);
    prevBtn.addEventListener('mouseleave', startAutoplay);
    nextBtn.addEventListener('mouseleave', startAutoplay);
});

// 视频弹出层功能
document.addEventListener('DOMContentLoaded', function() {
    const playBtn = document.getElementById('playVideo');
    const videoModal = document.querySelector('.video-modal');
    const closeBtn = document.querySelector('.close-video-btn');
    const featureVideo = document.getElementById('featureVideo');

    // 打开视频
    playBtn.addEventListener('click', () => {
        videoModal.classList.add('active');
        featureVideo.play();
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });

    // 关闭视频
    function closeVideo() {
        videoModal.classList.remove('active');
        featureVideo.pause();
        featureVideo.currentTime = 0;
        document.body.style.overflow = ''; // 恢复背景滚动
    }

    closeBtn.addEventListener('click', closeVideo);

    // 点击背景关闭视频
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideo();
        }
    });

    // ESC键关闭视频
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideo();
        }
    });
}); 