const fs=require("fs")

const express = require("express");
const bodyParser = require('body-parser');
const mysql = require("mysql2");
const cors = require("cors");
const addProducts = require("./create");

const app = express();
const corsOption={
    origin:[
        "http://localhost:5173"
    ]
}
app.use(cors(corsOption));
// parse requests of content-type - application
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));

const mysqlConnection = mysql.createConnection({
    socket: "C:/xampp/mysql/mysql.sock",
    host: "localhost",
    user: "root",
    host: "localhost",
    database: 'Apple',
})

mysqlConnection.connect((err) => {
    if (err) { console.log(err) }
    else console.log("connected")
})
app.get("/install", (req, res) => {
    let message = "Tables Created";
    let createProducts = `CREATE TABLE if not exists Products(
        product_id int auto_increment,
        Id varchar(255) not null,
        product_url varchar(255) not null,
        product_name varchar(255) not null,
        PRIMARY KEY (product_id)
    )`;
    const createProductDescription = `CREATE TABLE IF NOT EXISTS ProductDescription(
        description_id int auto_increment,
        product_id int(11) not null,
        product_brief_description TEXT not null,
        product_description TEXT not null,
        product_img varchar(255) not null,
        product_link varchar(255) not null,
        PRIMARY KEY (description_id),
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`;

    let createProductPrice = `CREATE TABLE if not exists ProductPrice(
        price_id int auto_increment,
        product_id int(11) not null,    
        starting_price varchar(255) not null,
        price_range varchar(255) not null,
        PRIMARY KEY (price_id),
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`;
    const Users = `CREATE TABLE IF NOT EXISTS Users(
        user_id int AUTO_INCREMENT ,
        username varchar(30) NOT NULL UNIQUE,
        password varchar(30) NOT NULL,
        email varchar(50) NOT NULL UNIQUE,
        PRIMARY KEY (user_id)
    )`;

    const createOrder = `CREATE TABLE IF NOT EXISTS ProductOrder(
        order_id int AUTO_INCREMENT ,
        product_id int(11) NOT NULL,
        users_id int(11) NOT NULL,
        PRIMARY KEY (order_id),
        FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE,
        FOREIGN KEY (users_id) REFERENCES Users(user_id)
    )`;


    mysqlConnection.query(createProducts, (err, results, fields) => {
        if (err) console.log(err);
    });
    mysqlConnection.query(createProductDescription, (err, results, fields) => {
        if (err) console.log(err);
    });
    mysqlConnection.query(createProductPrice, (err, results, fields) => {
        if (err) console.log(err);
    });
    mysqlConnection.query(Users, (err, results, fields) => {
        if (err) console.log(err);
    });
    mysqlConnection.query(createOrder, (err, results, fields) => {
        if (err) console.log(err);
    });

    res.end(message);
});
const productsData = [
    {
        "Id": "iphonese",
        "img": "https://www.apple.com/v/iphone/home/aj/images/overview/hero/hero_iphone_se__barrz3dlvxea_small_2x.jpg",
        "Url": "https://www.apple.com/shop/buy-iphone/iphone-11",
        "Title": "iPhone SE",
        "Brief": "Lots to love. Less to spend.",
        "StartPrice": "$399",
        "PriceRange": "From $9.54/mo. or $229 with trade-in.*",
        "Description": "iPhone SE packs our most powerful chip into our most popular size at our most affordable price. It's just what you've been waiting for."
    },
    {
        "Id": "iphone11",
        "img": "https://www.apple.com/v/iphone/home/aj/images/overview/hero/hero_iphone_se__barrz3dlvxea_small_2x.jpg",
        "Url": "https://www.apple.com/shop/buy-iphone/iphone-11",
        "Title": "iPhone 11",
        "Brief": "Lots to love. Less to spend.",
        "StartPrice": "$449",
        "PriceRange": "From $18.70/mo. or $449 with trade-in.*",
        "Description": "You can either pay for your new iPhone in full or pay monthly with carrier financing, iPhone Payments, the iPhone Upgrade Program, and now Apple Card Monthly Installments. Your carrier service plan will be charged separately. Just choose the option that works for you."
    },
    {
        "Id": "iphone11pro",
        "img": "https://www.apple.com/v/iphone/home/aj/images/overview/hero/hero_iphone_11_pro__d2lf9zrtcv8m_small_2x.jpg",
        "Url": "https://www.apple.com/shop/buy-iphone/iphone-11-pro",
        "Title": "iPhone 11 Pro",
        "Brief": "Pro cameras. Pro display. Pro performance.",
        "StartPrice": "$679",
        "PriceRange": "From $28.29/mo. or $679 with trade-in.*",
        "Description": "A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life. And a mind-blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro."
    }
]
app.get("/addProducts", (req, res) => {
    productsData.forEach(product => {
        const insertProductQuery = `INSERT INTO Products (product_url, Id, product_name) VALUES (?, ?,?)`;
        mysqlConnection.query(insertProductQuery, [product.Url,product.Id, product.Title], (err, results, fields) => {
            if (err) {
                console.log(`Error inserting product ${product.Title} into Products table: ${err.message}`);
                return;
            }

            const productId = results.insertId;

            // Insert product descriptions into ProductDescription table
            const insertDescriptionQuery = `INSERT INTO ProductDescription (product_id, product_brief_description, product_description, product_img, product_link) VALUES (?, ?, ?, ?, ?)`;
            mysqlConnection.query(insertDescriptionQuery, [productId, product.Brief, product.Description, product.img, product.Url], (err, results, fields) => {
                if (err) {
                    console.log(`Error inserting description for product ${product.Title}: ${err.message}`);
                    return;
                }
                console.log(`Description inserted for product ${product.Title} successfully`);
            });

            // Insert product prices into ProductPrice table
            const insertPriceQuery = `INSERT INTO ProductPrice (product_id, starting_price, price_range) VALUES (?, ?, ?)`;
            mysqlConnection.query(insertPriceQuery, [productId, product.StartPrice, product.PriceRange], (err, results, fields) => {
                if (err) {
                    console.log(`Error inserting price for product ${product.Title}: ${err.message}`);
                    return;
                }
                console.log(`Price inserted for product ${product.Title} successfully`);
            });
        });
    }); // Call the addProducts method
    res.end("inserted");
});
app.get("/iphones",(req, res) => { mysqlConnection.query(
    "SELECT * FROM Products JOIN ProductDescription JOIN ProductPrice ON Products.product_id = ProductDescription.product_id AND Products.product_id = ProductPrice.product_id",
    (err, rows, fields) => {
        if (!err) {
            let iphones = { products: rows };
            var stringIphones = JSON.stringify(iphones);
            fs.writeFile("product.json", stringIphones, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: "An error occurred while writing data to product.json" });
                } else {
                    console.log("Data written to product.json successfully");
                    res.end(stringIphones);
                }
            });
        } else {
            console.log(err);
            res.status(500).json({ error: "An error occurred while fetching iPhones data." });
        }
    }
)
});


app.listen(port, () => { console.log(`connected to ports ${port}`) })