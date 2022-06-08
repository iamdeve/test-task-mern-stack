import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { signup } from "../context/actions";
const Signup = () => {
	const navigate = useNavigate();
	const { globalState, dispatch } = useContext(AppContext);
	const [signupForm, setSignupForm] = useState({
		email: "",
		name: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setSignupForm((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		signup(signupForm, dispatch);
		setSignupForm({
			email: "",
			name: "",
		});
	};

	useEffect(() => {
		if (globalState.isAuthenticated) {
			navigate("/");
		}
	}, [globalState, navigate]);
	return (
		<>
			<div className="signup-form">
				{globalState.error ? <div className="error">{globalState.error}</div> : null}
				{globalState.successMsg ? <div className="error">{globalState.successMsg}</div> : null}
				<h2>Sign Up</h2>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Full name</label>
						<input className="form-control" type="text" name="name" value={signupForm.name} onChange={handleChange} />
					</div>
					<div className="form-group">
						<label>Email</label>
						<input className="form-control" type="email" name="email" value={signupForm.email} onChange={handleChange} />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
							Sign Up
						</button>
					</div>
				</form>
				<p>
					Already have account? <Link to="/signin">Please Login</Link>
				</p>
			</div>
		</>
	);
};

export default Signup;
