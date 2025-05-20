function sayHello() {
  console.log('Hello!');
}

// Cách đúng: truyền hàm
element.addEventListener('click', sayHello);

// Cách sai: gọi hàm luôn, truyền kết quả trả về
element.addEventListener('click', sayHello());