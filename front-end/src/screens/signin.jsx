import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import { AppContext } from "../context";
import { login } from "../context/actions";
const Signin = () => {
	const navigate = useNavigate();
	const { globalState, dispatch } = useContext(AppContext);
	const [loginForm, setLoginForm] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginForm((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(loginForm, dispatch);
		setLoginForm({
			email: "",
			password: "",
		});
	};
	useEffect(() => {
		if (globalState.isAuthenticated) {
			navigate("/");
		}
	}, [globalState, navigate]);
	return (
		<>
			<div className="login-form">
				{globalState.error ? <div className="error">{globalState.error}</div> : null}
				<h2>Sign In</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Email</label>
						<input className="form-control" type="email" name="email" value={loginForm.email} onChange={handleChange} />
					</div>
					<div className="form-group">
						<label>Password</label>
						<input className="form-control" type="password" name="password" value={loginForm.password} onChange={handleChange} />
					</div>
					<div className="form-group">
						<button disabled={globalState.loading} type="submit" className="btn btn-primary">
							Sign In
						</button>
					</div>
				</form>
				<p>
					Don't have account? <Link to="/signup">Please Signup</Link>
				</p>
			</div>
		</>
	);
};

export default Signin;
