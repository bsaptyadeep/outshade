import { useState } from "react";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function AddProPop() {
    const [product, setProduct] = useState("");
    const [category, setCategory] = useState("");
    // const [selcat, setSelcat] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/api/product";
            const {data: res} = await axios.post(url, { category: category, product: product });
            alert(res.body.message)
        }
        catch (er) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                alert(error.message);
                setError(error.response.data.message);
                //console.log(error);
            }
        }
    }

    return (
        <Popup trigger={<button> Add Product</button>} position="top center">
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter the Category of Product"
                        name="Category"
                        onChange={({ currentTarget: input }) => {
                            setCategory(input.value);
                        }}
                        value={category}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Enter new Product"
                        name="Product"
                        onChange={({ currentTarget: input }) => {
                            setProduct(input.value);
                        }}
                        value={product}
                        required
                    // className={styles.input}
                    />
                    <button type="submit">
                        Add
                    </button>
                </form>
            </div>
        </Popup>
    )
}

export default AddProPop