// control
const newsWrapper = document.querySelector('.news-container');
const newsLeftArrow = document.querySelector('.news-left-arrow');
const newsRightArrow = document.querySelector('.news-right-arrow');
const newsScrollAmount = 300;

// check disable
function updateNews(){
    const leftArrow = newsWrapper.scrollLeft;
    const maxLeftArrow = newsWrapper.scrollWidth - newsWrapper.clientWidth;

    if(leftArrow <= 0){
        newsLeftArrow.classList.add('disabled');
    } else {
        newsLeftArrow.classList.remove('disabled');
    }

    if(leftArrow >= maxLeftArrow){
        newsRightArrow.classList.add('disabled');
    } else {
        newsRightArrow.classList.remove('disabled');
    }
}


newsWrapper.addEventListener('scroll', updateNews);
updateNews();

//scoll
newsLeftArrow.addEventListener('click', ()=>{
    newsWrapper.scrollBy({
        left : -newsScrollAmount, 
            behavior : 'smooth' 
    });

});
    newsRightArrow.addEventListener('click', ()=>{
    newsWrapper.scrollBy({
        left : newsScrollAmount ,
        behavior : 'smooth' 
    });

});