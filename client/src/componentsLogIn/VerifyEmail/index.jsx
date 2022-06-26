import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import styles from "./styles.css";


function Veremail() {

    const [data, setData] = useState({
		email: "",
	});
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
        console.log(data)
	};

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const url = "http://localhost:8080/api/rpvmail";
            const {data: res} = await axios.post(url, data);
            setMsg(res.message);
        }catch(error)
        {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Forgot Password- Reset it!</h1>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
                    // className={styles.input}
                />
                {error && <div>{error}</div>}
                <button type="submit">
                    Confirm Registered Email
                </button>
            </form>
        </div>
    );
}

export default Veremail;
