import { useState } from "react";
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function AddCatPop() {

    const [category, setCategory] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // setOpen(false)
            const url = "http://localhost:8080/api/category";
            const {data: res} = await axios.post(url, { category: category });
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

    const handleChange = ({ currentTarget: input }) => {
        setCategory(input.value)
    }


    return (
        <Popup trigger={<button> Add Category</button>} position="top center">
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter new Category"
                        name="category"
                        onChange={handleChange}
                        value={category}
                        required
                    // className={styles.input}
                    />
                    {error && <div>{error}</div>}
                    <button type="submit">
                        Add
                    </button>
                </form>
            </div>
        </Popup>
    )
}

export default AddCatPop