// click input hiện suggest 
const searchInput = document.getElementById("searchInput");
const searchSuggestions = document.getElementById("searchSuggestions");

searchInput.addEventListener("click",function(event){
    searchSuggestions.style.display = "flex";
    searchSuggestions.style.flexDirection= "column";
    event.stopPropagation();
    

});
// click ra ngoài suggest cũng đóng 
document.addEventListener("click", function(event){
    if(!searchInput.contains(event.target) && !searchSuggestions.contains(event.target)){
        searchSuggestions.style.display= "none";
    }

});


// menu phu
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const menuLinks = document.querySelectorAll('.menu-link');
    
    // Toggle menu
    menuIcon.addEventListener('click', function() {
        this.classList.toggle('open');
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    
    // Close menu
    closeMenu.addEventListener('click', function() {
        menuIcon.classList.remove('open');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Close khi click overlay
    overlay.addEventListener('click', function() {
        menuIcon.classList.remove('open');
        mobileMenu.classList.remove('active');
        this.classList.remove('active');
    });
    
    // Submenu toggle
    menuLinks.forEach(link => {
        const parentItem = link.closest('.menu-item');
        const submenu = parentItem.querySelector('.submenu');
        
        if (submenu) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                submenu.classList.toggle('active');
                parentItem.classList.toggle('open'); 
            });
        }
    });
    
});


