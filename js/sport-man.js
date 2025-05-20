// Lấy các phần tử cần thiết
const menwrapper = document.querySelector('.sport-men-wrapper');
const menLeftArrow = document.querySelector('.sport-men-left');
const menRightArrow = document.querySelector('.sport-men-right');
const menScrollAmount = 300;


function updateDealArrows() {
    menLeftArrow.classList.toggle('disabled', menwrapper.scrollLeft <= 5);
    menRightArrow.classList.toggle('disabled', 
        menwrapper.scrollLeft >= menwrapper.scrollWidth - menwrapper.clientWidth - 10);
}

menLeftArrow.addEventListener('click', () => {
    menwrapper.scrollBy({ left: -menScrollAmount, behavior: 'smooth' });
    setTimeout(updateDealArrows, 300);
});

menRightArrow.addEventListener('click', () => {
    menwrapper.scrollBy({ left: menScrollAmount, behavior: 'smooth' });
    setTimeout(updateDealArrows, 300);
});

// Khởi tạo ban đầu
updateDealArrows();
menwrapper.addEventListener('scroll', updateDealArrows);