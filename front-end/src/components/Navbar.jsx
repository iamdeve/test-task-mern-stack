import React, { useContext } from "react";
import "./navbar.css";
import { AppContext } from "../context";
import { LOGOUT } from "../context/types";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
	const navigate = useNavigate();
	const { dispatch } = useContext(AppContext);
	return (
		<nav className="navbar">
			<div>LOGO</div>
			<ul>
				<li>
					<span
						style={{ cursor: "pointer" }}
						onClick={() => {
							dispatch({ type: LOGOUT });
							navigate("/signin");
						}}>
						Logout
					</span>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
