import express from "express";

const app = express();
const PORT = 4000;

let products = [];

app.use(express.json());

app.post('/add-product', (req,res)=>{
    const productBody = req.body
    products.push(productBody);
    console.log(products)
    res.status(201).send({ status: "success", message: "Product Added Successfully" })
})

app.get('/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
    console.log(`App is Running On Port ${PORT}`)
})