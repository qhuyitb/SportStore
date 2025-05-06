
//  *Hàm xử lý cuộn danh mục
document.addEventListener("DOMContentLoaded", function(){
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const categoryList = document.querySelector(".category-list");
    const scrollAmount = 200;

    rightArrow.addEventListener("click", function(){
        categoryList.scrollBy({left: scrollAmount, behavior: "smooth"});

    });

    leftArrow.addEventListener("click", function(){
        categoryList.scrollBy({left: -scrollAmount, behavior: "smooth"});
        
    });
    
});

 