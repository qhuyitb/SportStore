// Lấy các phần tử cần thiết
const womanWrapper = document.querySelector('.sport-woman-wrapper');
const womanRightArrow = document.querySelector('.sport-woman-right');
const womanLeftArrow = document.querySelector('.sport-woman-left');
const womanScrollAmount = 300;

function updateWomanArrow() {
    const womanLeft = womanWrapper.scrollLeft;
    const maxWomanLeft = womanWrapper.scrollWidth - womanWrapper.clientWidth;
    if(womanLeft <=0) {
        womanLeftArrow.classList.add('disabled');
    }
    else{
        womanLeftArrow.classList.remove('disabled');
    }

    if( womanLeft >= maxWomanLeft) {
        womanRightArrow.classList.add('disabled');

    }
    else{
        womanRightArrow.classList.remove('disabled');
    }
}
// kiem tra lai moi khi click
womanWrapper.addEventListener('scroll', updateWomanArrow);
// goi ham 1 lan khi load
updateWomanArrow();


womanLeftArrow.addEventListener('click', function () {
    womanWrapper.scrollBy({left: -womanScrollAmount, behavior: 'smooth'});

});

womanRightArrow.addEventListener('click', function (){
    womanWrapper.scrollBy({
        left: womanScrollAmount,
        behavior: 'smooth'
    });
});


