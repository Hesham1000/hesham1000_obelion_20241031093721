CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    providerId INT NOT NULL,
    userId INT NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(255) NOT NULL,
    FOREIGN KEY (providerId) REFERENCES providers(id)
);
