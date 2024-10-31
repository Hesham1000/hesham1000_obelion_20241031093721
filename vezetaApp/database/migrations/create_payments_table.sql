CREATE TABLE Payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cardNumber VARCHAR(255) NOT NULL,
    cardHolderName VARCHAR(255) NOT NULL,
    expiryDate VARCHAR(255) NOT NULL,
    cvv VARCHAR(255) NOT NULL,
    walletId VARCHAR(255),
    insuranceProvider VARCHAR(255),
    policyNumber VARCHAR(255)
);
