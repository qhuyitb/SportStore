// chuyen banner slide 

document.addEventListener('DOMContentLoaded', function() {
    const banners = document.querySelectorAll('.flash-sale-banner');
    const dots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentIndex = 0;

    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);

    function showSlide(index) {
        banners.forEach(banner => {
            banner.classList.remove('active');
            // Reset text animation them hieu ung
            const texts = banner.querySelectorAll('.banner-content > *');
            texts.forEach(text => {
                text.style.opacity = 0;
                
            });
        });
    
        dots.forEach(dot => dot.classList.remove('active'));
    
        // Active banner và dot mới
        banners[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    
        // kích hoạt lại text
        const activeTexts = banners[index].querySelectorAll('.banner-content > *');
        activeTexts.forEach((text, idx) => {
            setTimeout(() => {
                text.style.opacity = 1;
                
            }, idx * 200); 
        });
    
        // Reset auto slide timer
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    function nextSlide() {
        let newIndex = (currentIndex + 1) % banners.length;
        showSlide(newIndex);
    }

    function prevSlide() {
        let newIndex = (currentIndex - 1 + banners.length) % banners.length;
        showSlide(newIndex);
    }

    // Arrow controls
    nextArrow.addEventListener('click', nextSlide);
    prevArrow.addEventListener('click', prevSlide);

    // Dot controls
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Pause on hover
    const slider = document.querySelector('.banner-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    });
});