const brandContainer = document.querySelector('.brand-container');
const brandLeftArrow = document.querySelector('.prev-brand-btn') ;
const brandRightArrow = document.querySelector('.next-brand-btn') ;
const brandScrollAmount = 300;
// kiem tra disable
function updateBrand(){
    const brandLeft = brandContainer.scrollLeft;
    const maxBrandLeft = brandContainer.scrollWidth - brandContainer.clientWidth;
    if(brandLeft <=0) {
        brandLeftArrow.classList.add('disabled');

    }
    else {
        brandLeftArrow.classList.remove('disabled');
    }
    if( brandLeft >= maxBrandLeft){
        brandRightArrow.classList.add('disabled');

    }
    else {
        brandRightArrow.classList.remove('disabled');
    }


}

brandContainer.addEventListener('scroll', updateBrand);
updateBrand();

brandLeftArrow.addEventListener('click', function (){
    brandContainer.scrollBy({
        left : -brandScrollAmount,
        behavior : 'smooth'
    });


});


brandRightArrow.addEventListener('click', function (){
    brandContainer.scrollBy({
        left : brandScrollAmount,
        behavior : 'smooth'
    });


});