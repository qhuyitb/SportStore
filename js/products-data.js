// products-data.js - File chứa tất cả dữ liệu sản phẩm
const PRODUCTS_DATA = [
    {
        id: 1,
        sizes: "S,M,L,XL,XXL",
        category: "Sports",
        badge: "Giảm 33%",
        image: "../images/aodtqgvndo.webp",
        colors: [
            { class: "clred", src: "../images/aodtqgvndo.webp" },
            { class: "clwhite", src: "../images/aodtqgvn.webp" }
        ],
        title: "Áo thi đấu bóng đá đội tuyển quốc gia Việt Nam",
        currentPrice: "199.000đ",
        originalPrice: "299.000đ",
        price: 199000
    },
    {
        id: 2,  
        sizes: "20,21,22",
        category: "Water Sports",
        badge: null,
        image: "../images/quanboihoatietlacay.webp",
        colors: [],
        title: "Quần short bơi 100 cho nam - Họa tiết lá cây",
        currentPrice: "495.000₫",
        originalPrice: null,
        price: 495000
    },
   {
        id: 3,
        sizes: "36,37,38,39,40,41",
        category: "Running",
        badge: "Giảm 19%",
        image: "../images/product11.webp",
        colors: [
            { class: "clblue", src: "../images/product11.webp" },
            { class: "clgray", src: "../images/product12.webp" },
            { class: "clwhite", src: "../images/product13.webp" },
            { class: "clblack", src: "../images/product14.webp" }
        ],
        title: "Giày chạy bộ JOGFLOW 500.1 cho nam",
        currentPrice: "969.000đ",
        originalPrice: "1.200.000đ",
        price: 969000
    },
    {
        id: 4,
        sizes: "big,small",
        category: "Outdoor",
        badge: "Giảm 50%",
        image: "../images/product41.webp",
        colors: [
            { class: "clviolet", src: "../images/product41.webp" },
            { class: "clblue", src: "../images/product42.jpg" }
        ],
        title: "Balô dã ngoại thời trang cao cấp NH100 10L",
        currentPrice: "79.000đ",
        originalPrice: "159.000đ",
        price: 79000
    },
      
    {
        id: 5,
        sizes: "37,38,39,40",
        category: "Running",
        badge: "Giảm 33%",
        image: "../images/product31.webp",
        colors: [
            { class: "clwhite-black", src: "../images/product31.webp" },
            { class: "clgray-pink", src: "../images/product32.webp" }
        ],
        title: "Giày đi bộ thể dục PW 100 cho trẻ em",
        currentPrice: "199.000đ",
        originalPrice: "299.000đ",
        price: 199000
    },
    {
        id: 6,
        sizes: "10kg,15kg,20kg",
        category: "Fitness",
        badge: "Giảm 33%",
        image: "../images/bong_tap_gym_pink.webp",
        colors: [
            { class: "clpink", src: "../images/bong_tap_gym_pink.webp" },
            { class: "clsea", src: "../images/bong_tap_gym_blue.webp" }
        ],
        title: "Bóng tập Gym Resist 60 cm cho trẻ em",
        currentPrice: "199.000đ",
        originalPrice: "299.000đ",
        price: 199000
    },
    {
        id: 7,
        sizes: "38,39,40,41,42",
        category: "Running",
        badge: "Giảm 20%",
        image: "../images/product21.webp",
        colors: [
            { class: "clblue", src: "../images/product21.webp" },
            { class: "clgray", src: "../images/product22.webp" },
            { class: "clwhite", src: "../images/product23.webp" },
            { class: "clblack", src: "../images/product24.webp" }
        ],
        title: "Giày chạy bộ KALENJI cao cấp 500.1 cho nam",
        currentPrice: "1.200.000đ",
        originalPrice: "1.500.000đ",
        price: 1200000
    },
    {
        id: 8,
        sizes: "small,big",
        category: "Outdoor",
        badge: "Giảm 31%",
        image: "../images/bong_ro.webp",
        colors: [],
        title: "Bóng rổ BT100 cỡ 7 cho nam từ 13 tuổi trở lên",
        currentPrice: "345.000đ",
        originalPrice: "500.000đ",
        price: 345000
    },
    {
        id: 9,
        sizes: "20,21,22",
        category: "Water Sports",
        badge: null,
        image: "../images/quanduido_1.webp",
        colors: [
            { class: "clred", src: "../images/quanduido_1.webp" },
            { class: "clxl", src: "../images/quanduido_2.jpg" },
            { class: "clblue", src: "../images/quanduido_3.jpg" }
        ],
        title: "Quần short bơi 100 cho nam",
        currentPrice: "145.000đ",
        originalPrice: null,
        price: 145000
    },
    {
        id: 10,
        sizes: "S,M,L",
        category: "Outdoor",
        badge: null,
        image: "../images/cnn_1.webp",
        colors: [
            { class: "clpink", src: "../images/cnn_1.webp" },
            { class: "clxd", src: "../images/cnn_2.webp" }
        ],
        title: "Áo khoác nỉ leo núi MH520 cho nữ",
        currentPrice: "175.000đ",
        originalPrice: null,
        price: 175000
    },
    {
        id: 11,
        sizes: "15L,20L",
        category: "Outdoor",
        badge: "Giảm 22%",
        image: "../images/tuigiay.webp",
        colors: [],
        title: "Túi đựng giày Light",
        currentPrice: "69.000đ",
        originalPrice: "89.000đ",
        price: 69000
    },
    {
        id: 12,
        sizes: "S,M,L",
        category: "Outdoor",
        badge: "Giảm 19%",
        image: "../images/bldn_1.webp",
        colors: [
            { class: "clcamxanh", src: "../images/bldn_1.webp" },
            { class: "clpink", src: "../images/bldn_2.webp" }
        ],
        title: "Balô leo núi dã ngoại Arpenaz 7L cho trẻ em",
        currentPrice: "125.000đ",
        originalPrice: "155.000đ",
        price: 125000
    },
    {
        id: 13,
        sizes: "500ml,1L",
        category: "Outdoor",
        badge: null,
        image: "../images/binhgallon.webp",
        colors: [],
        title: "Bình đựng nước Gallon - Đen",
        currentPrice: "275.000đ",
        originalPrice: null,
        price: 275000
    },
    {
        id: 14,
        sizes: "S,M,L",
        category: "Water Sports",
        badge: null,
        image: "../images/kinhboixanh.webp",
        colors: [
            { class: "clsea", src: "../images/kinhboixanh.webp" },
            { class: "clpink", src: "../images/kinhboihong.jpg" }
        ],
        title: "Kính bơi tròng kính trong suốt Xbase",
        currentPrice: "125.000đ",
        originalPrice: null,
        price: 125000
    },
    {
        id: 15,
        sizes: "S,M,L",
        category: "Water Sports",
        badge: null,
        image: "../images/muboido.webp",
        colors: [
            { class: "clpink", src: "../images/muboido.webp" },
            { class: "clblack", src: "../images/muboi.webp" }
        ],
        title: "Mũ bơi lưới",
        currentPrice: "49.000đ",
        originalPrice: null,
        price: 49000
    },
    
    {
        id: 16,
        sizes: "S,M,L",
        category: "Fitness",
        badge: null,
        image: "../images/aobalochonu.jpg",
        colors: [],
        title: "Áo Tank Top thể thao Jockey Nữ - J1231",
        currentPrice: "445.000đ",
        originalPrice: null,
        price: 445000
    },
    {
        id: 17,
        sizes: "39,40,41,42",
        category: "Running",
        badge: "Giảm 18%",
        image: "../images/giayleonuinam.webp",
        colors: [],
        title: "Giày leo núi dã ngoại cổ lửng Arpenaz 50 cho nam",
        currentPrice: "450.000đ",
        originalPrice: "550.000đ",
        price: 450000
    },
    {
        id: 18,
        sizes: "S,M,L",
        category: "Outdoor",
        badge: "Giảm 30%",
        image: "../images/bobancung.webp",
        colors: [],
        title: "Bộ bắn cung Soft Archery 100",
        currentPrice: "1.395.000đ",
        originalPrice: "2.000.000đ",
        price: 1395000
    },
    {
        id: 19,
        sizes: "S,M,L",
        category: "Outdoor",
        badge: "Giảm 37%",
        image: "../images/votcaulong.webp",
        colors: [],
        title: "Bộ vợt cầu lông dành cho mọi lứa tuổi - vàng xanh dương",
        currentPrice: "345.000đ",
        originalPrice: "550.000đ",
        price: 345000
    },
    {
        id: 20,
        sizes: "36,37,38,39",
        category: "Running",
        badge: null,
        image: "../images/giaydibonu.webp",
        colors: [],
        title: "Giày đi bộ cho nữ Soft 140.2",
        currentPrice: "425.000đ",
        originalPrice: null,
        price: 425000
    },
    {
        id: 21,
        sizes: "1 bộ",
        category: "Outdoor",
        badge: null,
        image: "../images/bongtenis.jpg",
        colors: [],
        title: "Bóng tennis V2 570 cao cấp",
        currentPrice: "50.000đ",
        originalPrice: null,
        price: 50000
    },
    {
        id: 22,
        sizes: "S,M,L",
        category: "Outdoor",
        badge: null,
        image: "../images/vottenis.webp",
        colors: [
            { class: "clwhite", src: "../images/vottenis.webp" },
            { class: "clblack", src: "../images/vottennisden.webp" }
        ],
        title: "Vợt tennis TF-X1 V2 275-Forheads",
        currentPrice: "2.275.000đ",
        originalPrice: null,
        price: 2275000
    },
    {
        id: 23,
        sizes: "26inch,28inch",
        category: "Cycling",
        badge: "Giảm 50%",
        image: "../images/xedapleodoc.jpg",
        colors: [],
        title: "Xe đạp địa hình leo núi BaseLeo cao cấp",
        currentPrice: "5.125.000đ",
        originalPrice: "10.300.000đ",
        price: 5125000
    }
    
];

// Hàm tạo HTML cho sản phẩm
function createProductHTML(product) {
    const badgeHTML = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
    
    const colorsHTML = product.colors.length > 0 ? `
        <div class="color-option">
            <div class="color-boxes">
                ${product.colors.map(color => 
                    `<div class="color-box ${color.class}" data-src="${color.src}"></div>`
                ).join('')}
            </div>
        </div>
    ` : '<div class="color-option" style="visibility: hidden"></div>';

    const originalPriceHTML = product.originalPrice ? 
        `<span class="original-price">${product.originalPrice}</span>` : '';

    return `
        <div class="product-card" data-sizes="${product.sizes}" data-category="${product.category}" data-price="${product.price}">
            ${badgeHTML}
            <div class="product-wishlist">
                <i class="ti-heart"></i>
            </div>
            <div class="product-image">
                <img class="product-image-second" src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                ${colorsHTML}
                <h3>${product.title}</h3>
                <div class="product-pricing">
                    <span class="current-price">${product.currentPrice}</span>
                    ${originalPriceHTML}
                </div>
                <button class="option-btn">
                    <i class="fa-solid fa-gear"></i> Tùy chọn
                </button>
            </div>
        </div>
    `;
}

// Export để sử dụng ở file khác
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PRODUCTS_DATA, createProductHTML };
}