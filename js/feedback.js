const slider = document.getElementById('testimonialSlider');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const cardWidth = document.querySelector('.testimonial-card').offsetWidth + 25; // width + gap
    
    // Xử lý nút next
    nextButton.addEventListener('click', () => {
      slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
    
    // Xử lý nút prev
    prevButton.addEventListener('click', () => {
      slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
    
    // Tự động ẩn nút khi ở đầu/cuối
    slider.addEventListener('scroll', () => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      
      if (slider.scrollLeft <= 10) {
        prevButton.style.opacity = '0.5';
        prevButton.style.cursor = 'not-allowed';
      } else {
        prevButton.style.opacity = '1';
        prevButton.style.cursor = 'pointer';
      }
      
      if (slider.scrollLeft >= maxScroll - 10) {
        nextButton.style.opacity = '0.5';
        nextButton.style.cursor = 'not-allowed';
      } else {
        nextButton.style.opacity = '1';
        nextButton.style.cursor = 'pointer';
      }
    });
    
    // Khởi tạo trạng thái ban đầu
    slider.dispatchEvent(new Event('scroll'));