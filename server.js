import express from "express";
import cors from "cors"
import path from "path"

const app = express();
const PORT = 5000;

let products = [];

app.use(cors());
app.use(express.json());

app.post('/add-product', (req, res) => {
  const productBody = req.body;
  if (!productBody?.title || !productBody?.price || !productBody?.description || !productBody?.image) {
    res.status(400).send({ status: 'ERROR', message: "Required parameter Missing!" })
    return;
  }

  products.push({ id: new Date().getTime(), ...productBody });
  console.log(products)
  res.status(201).send({ status: "success", message: "Product Added Successfully" })
})

app.get('/products', (req, res) => {
  res.send({ status: "success", products });
});

app.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  const selectedProduct = products.find((eachProduct) => eachProduct.id == productId);
  if (!selectedProduct) {
    res.status(404).send({ status: "error", message: "product not found" })
    return;
  }
  res.send({ status: "success", product: selectedProduct })
})

app.put('/product/:id', (req, res) => {
  const productId = req.params.id;
  const productBody = req.body
  if (!productBody?.title || !productBody?.price || !productBody?.description || !productBody?.image) {
    res.status(400).send({ status: "error", message: "Required Parameter Missing" })
    return;
  }

  let targetedProductId = null; // 2
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == productId) {
      targetedProductId = i // 2
      break;
    }
  }

  if (targetedProductId == null) {
    res.status(404).send({ status: "error", message: `Product Not Found with id ${productId}` })
    return;
  }

  products[targetedProductId].title = productBody?.title
  products[targetedProductId].price = productBody?.price
  products[targetedProductId].description = productBody?.description
  products[targetedProductId].image = productBody?.image
  res.status(200).send({ status: "success", message: "Product Update Successfully" })

})

app.delete('/product/:id', (req, res) => {
    let targetedProduct = req.params.id;
    products = products.filter((eachItem) => eachItem.id != targetedProduct);
    res.status(200).send({ status: "success", message: "product deleted successfully" })
})

const __dirname = path.resolve();
const __frontend = path.join(__dirname, './web/build')
app.use('/', express.static(__frontend))
app.use("/*splat", express.static(__frontend))

app.listen(PORT, () => {
  console.log(`App is Running On Port ${PORT}`)
})