import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import './App.css';

function App() {

  const baseUrl = "https://build-ecom-api.vercel.app"
  const [allProducts, setAllProducts] = useState([]);

  const getAllProducts = async () => {
    // const apiReq = {
    //   method: "get",
    //   url: "/products"
    // }
    try {
      const apiRes = await axios.get(`${baseUrl}/products`);
      // console.log("apiRes", apiRes.data)
      setAllProducts(apiRes.data.products)
    } catch (error) {
      console.log("Error", error)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${baseUrl}/product/${id}`);
      getAllProducts();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  const editProduct = async (product) => {
    const title = prompt("Enter new title", product.title);
    const price = prompt("Enter new price", product.price);
    const description = prompt("Enter new description", product.description);
    const image = prompt("Enter new image URL", product.image);

    if (!title || !price || !description || !image) {
      return;
    }

    try {
      await axios.put(`${baseUrl}/product/${product.id}`, {
        title,
        price,
        description,
        image
      });

      getAllProducts();
    } catch (error) {
      console.log("Edit Error:", error);
    }
  };


  const formik = useFormik({
    initialValues: {
      productImage: '',
      title: '',
      price: 0,
      description: ''
    },
    onSubmit: async (values) => {
      // console.log(values)
      // const apiReq = {
      //   method: "post",
      //   url: "/product",
      //   body:{
      //     title: values.title,
      //     price: values.price,
      //     description: values.description,
      //     image: values.productImage
      //   }
      // }
      try {
        await axios.post(`${baseUrl}/add-product`, {
          title: values.title,
          price: values.price,
          description: values.description,
          image: values.productImage
        })
        // console.log("apiRes", apiRes.data)
        getAllProducts()
      } catch (error) {
        console.log("Err", error)
        alert(error.response.data.message)
      }
    }
  })

  return (
    <div className="App">

      <form onSubmit={formik.handleSubmit}>
        <label>
          Image Url:
          <input
            type="url"
            placeholder="https://image.png"
            name="productImage"
            onChange={formik.handleChange}
            value={formik.values.productImage}
          />
        </label>
        <br />
        <label>
          Title:
          <input
            type="text"
            placeholder="Mobile"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </label>
        <br />
        <label>
          price:
          <input
            type="number"
            placeholder="5000"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
          ></textarea>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      <div className="products-container">

  {allProducts.map((eachProduct) => (

    <div className="product-card" key={eachProduct.id}>

      <img
        src={eachProduct.image}
        alt={eachProduct.title}
        className="product-image"
      />

      <div className="product-info">

        <h2>{eachProduct.title}</h2>

        <h3>Rs. {eachProduct.price}</h3>

        <p>{eachProduct.description}</p>

        <div className="product-actions">

          <button
            className="edit-btn"
            onClick={() => editProduct(eachProduct)}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => deleteProduct(eachProduct.id)}
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  ))}

</div>
    </div>
  );
}

export default App;