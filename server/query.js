 // Import your MySQL connection module

function getIPhones(req, res) {
    mysqlConnection.query(
        "SELECT * FROM Products JOIN ProductDescription JOIN ProductPrice ON Products.product_id = ProductDescription.product_id AND Products.product_id = ProductPrice.product_id",
        (err, rows, fields) => {
            if (!err) {
                let iphones = { products: rows };
                var stringIphones = JSON.stringify(iphones);
                res.end(stringIphones);
            } else {
                console.log(err);
                res.status(500).json({ error: "An error occurred while fetching iPhones data." });
            }
        }
    );
}

module.exports = { getIPhones };
