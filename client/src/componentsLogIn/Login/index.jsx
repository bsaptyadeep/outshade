import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login"
import { Link } from "react-router-dom";
import styles from "./styles.css";

const Login = () => {

	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);

			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	const handleFailure = (result) => {
		alert(result);
	};

	const handleLogin = async (googleData) => {
		try {
			const { data: res } = await axios.post('http://localhost:8080/api/google-login', googleData)
			// alert(res);
			localStorage.setItem("token", res.data);
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
	};

	return (
		<div className="LogIn-SignIn">
			<div>
				<div>
					<form onSubmit={handleSubmit}>
						<h1 className="welcome">Welcome Back !</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit">
							Log In
						</button>
						<GoogleLogin style={{ width: "200px" }} className="googleLogin"
							clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
							buttonText="Log In with Google"
							onSuccess={handleLogin}
							onFailure={handleFailure}
							cookiePolicy={'single_host_origin'}
						/>
						<div className="goToSign">
							<p>New Here?
								<a style={{ margin: "5px", textDecoration: "none", color: "#3300FF" }} href="/register">
									<b>Sign Up</b>
								</a>
							</p>
						</div>
						<a className="forgotPass" href="/for">Reset Password</a>
					</form>
				</div>

			</div>
			<div className="image"><img src={require('./img/logInpic.png')} width={400} height={400} /></div>
		</div>
	);
};

export default Login;
