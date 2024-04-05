// Import your MySQL connection module

function addProducts(productsData) {
    productsData.forEach(product => {
        const insertProductQuery = `INSERT INTO Products (product_url, Id, product_name) VALUES (?, ?)`;
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
    });
}

module.exports = addProducts;
