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