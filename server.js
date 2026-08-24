import express from "express";

const app = express();
const PORT = 5000;

let products = [];

app.use(express.json());

app.post('/add-products', (req,res)=>{
    const productBody = req.body;
    if(!productBody?.title || !productBody?.price || !productBody?.description || !productBody?.image ){
      res.status(400).send({status : 'ERROR', massage : "Required parameter Missing!"})
      return;
    }
    
    products.push(productBody);
    console.log(products)
    res.status(201).send({ status: "success", message: "Product Added Successfully" })
})

app.get('/products', (req, res) => {
  res.json({ id: new Date().getTime(), ...products });
});

app.listen(PORT, () => {
    console.log(`App is Running On Port ${PORT}`)
})