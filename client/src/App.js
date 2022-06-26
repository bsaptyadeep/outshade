import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./componentsLogIn/Main";
import Login from "./componentsLogIn/Login";
import EmailVerify from "./componentsLogIn/EmailVerify";
import ForgotPass from "./componentsLogIn/ForgotPass";
import VerifyEmail from "./componentsLogIn/VerifyEmail"
import Register from "./componentsLogIn/Register";
import './index.css'

function App() {
	const user = localStorage.getItem("token");

	return (
		<div className="App">
			<Routes>
				{user && <Route path="/" exact element={<Main />} />}
				<Route path="/register" exact element={<Register />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/for" exact element={<VerifyEmail />} />
				<Route path="/" element={<Navigate replace to="/login" />} />
				<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
				<Route path="/users/:id/resetpass/:token" element={<ForgotPass />} />
			</Routes>
		</div>

	);
}

export default App;
