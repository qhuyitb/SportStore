-- Tạo cơ sở dữ liệu
CREATE DATABASE QLClient;
GO

-- Sử dụng cơ sở dữ liệu
USE QLClient;
GO

-- Tạo bảng client
CREATE TABLE client (
    ID INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    fullName NVARCHAR(100) NOT NULL,
    role TINYINT CHECK (role BETWEEN 0 AND 9),
    tel CHAR(10) CHECK (tel NOT LIKE '%[^0-9]%'),
    ngaySinh DATE,
    sex VARCHAR(10)
);
GO

-- Thêm dữ liệu mẫu vào bảng client
INSERT INTO client (username, password, fullName, role, tel, ngaySinh, sex)
VALUES 
('test1@example.com', '123456', N'Lê Văn A', 1, '0912345678', '1990-01-01', 'Nam'),
('test2@example.com', 'password123', N'Ngô Thị B', 2, '0987654321', '1992-05-20', 'Nữ');
('admin@example.com', 'password123', N'admin', 2, '0987654321', '1992-05-20', 'Nam');
GO

-- Tạo bảng Orders
CREATE TABLE Orders (
    orderId VARCHAR(20) PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    orderDate DATETIME NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    shippingMethod NVARCHAR(100),
    paymentMethod NVARCHAR(100),
    FOREIGN KEY (username) REFERENCES client(username)
);
GO

-- Tạo bảng OrderItems
CREATE TABLE OrderItems (
    id INT IDENTITY(1,1) PRIMARY KEY,
    orderId VARCHAR(20) NOT NULL,
    name NVARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (orderId) REFERENCES Orders(orderId)
);
GO
