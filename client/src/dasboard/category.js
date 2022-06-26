import axios from 'axios';
import React, { useState, useEffect } from 'react'
import AddCatPop from './utils/addCatPop'
import './category.css';

function Category() {

  const [category, setCategory] = useState([]);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const url = "http://localhost:8080/api/category";

  const getCategories = async () => {
    try {
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

  const deleteCategory = async (id) => {
    const {data: res} = await axios.delete(url, { data: { _id: id } } )
    console.log(res);
  }

  useEffect(() => {
    setTimeout(() => {
      getCategories()
    }, 1000);
  })

  return (
    <div>
      <section>
        {category.length !== 0 ?
          category.map((cat, index) => {
            return (
              <div key={cat._id} className={index % 2 === 1 ? "highlight cont" : "cont"}>
                <li>{cat.category}</li>
                <button on="true" className="del"
                  onClick={() => {
                    deleteCategory(cat._id);
                  }}
                >Delete</button>
              </div>
            )
          }) : (msg !== "" ? msg : (error !== "" ? error : "loading..."))
        }
      </section>
      <footer>
        <AddCatPop />
      </footer>
    </div>
  )
}

export default Category