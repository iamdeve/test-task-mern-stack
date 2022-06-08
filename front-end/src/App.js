import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/home";
import Signin from "./screens/signin";
import NotFound from "./screens/notFound";
import Signup from "./screens/signup";

function App() {
	return (
		<div className="app">
			<Router>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/signin" element={<Signin />} />
					<Route exact path="/signup" element={<Signup />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
