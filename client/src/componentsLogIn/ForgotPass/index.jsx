import { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.css";
import { Fragment } from "react/cjs/react.production.min";


function ForgotPass() {

	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();

	const [data, setData] = useState({ password: "", rpassword: "", user_id: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
		console.log(data);
	};

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:8080/api/rpvmail/${param.id}/resetpass/${param.token}`;
				console.log(param.id);
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
				setData({ ...data, user_id: param.id });
			} catch (error) {
				console.log("error", error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (data.password !== data.rpassword) {
				setError("password donot match")
			}
			else {
				try {
					const url = "http://localhost:8080/api/resetpass";
					const { data: res } = await axios.post(url, data);
					// localStorage.setItem("token", res.data);
					window.location = "/";
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

		}
		catch (err) {

		}
	};

	return (
		<div>
			<Fragment>
				{validUrl ? (
					<form onSubmit={handleSubmit}>
						<h1>Reset Password</h1>
						<input
							type="password"
							placeholder="password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							// className={styles.input}
						/>
						<input
							type="password"
							placeholder="Re-Enter Password"
							name="rpassword"
							onChange={handleChange}
							value={data.rpassword}
							required
							// className={styles.input}
						/>
						{error && <div>{error}</div>}
						<button type="submit">
							Confirm New Password
						</button>
					</form>) : (
					<h1>404 Not Found</h1>
				)}</Fragment>
		</div>
	)
}

export default ForgotPass;
