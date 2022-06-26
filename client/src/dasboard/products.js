import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProPop from './utils/addProPop';
import './products.css'

function Products() {

  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");


  const getCategories = async () => {
    try {
      const url = "http://localhost:8080/api/category";
      const { data: res } = await axios.get(url);
      setCategory(res.cat);
      setMsg(res.message);
    }
    catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  }

  const getProduct = async () => {
    try {
      const url = "http://localhost:8080/api/product";
      const { data: res } = await axios.get(url);
      setProduct(res.pro);
      setMsg(res.message);
    }
    catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  }

  const deleteProduct = async (id) => {
    const url = "http://localhost:8080/api/product";
    const {data: res} = await axios.delete(url, { data: { _id: id } } )
    console.log(res);
  }

useEffect(() => {
  setTimeout(() => {
    getCategories();
    getProduct()
  }, 1000);
})

return (
  <div>
    <section>
      {category.length !== 0 ?
        category.map((cat, index) => {
          return (
            <div key={cat._id}>
              <h4>{cat.category}</h4>
              <div className='products'>
                {
                  product.filter((pro) => {
                    return pro.category===cat.category
                  }).map((pro)=>{
                    return (
                      <div key={pro._id} className='product'>
                        {pro.product}
                        <button
                        onClick={()=> {
                          deleteProduct(pro._id)
                        }}
                        >Delete</button>
                        </div>
                    )
                  }
                  )
                }
              </div>
            </div>
          )
        }) : (msg !== "" ? msg : (error !== "" ? error : "loading..."))
      }
    </section>
    <footer>
      <AddProPop category={category} />
    </footer>
  </div>
)
}

export default Products