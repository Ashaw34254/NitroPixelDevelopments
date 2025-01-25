CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    category VARCHAR(100),
    image_path VARCHAR(255),
    specs TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
