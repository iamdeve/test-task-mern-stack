import jwtDecode from "jwt-decode";

export const setToken = (token) => {
	localStorage.setItem("TEST_TASK_TOKEN", token);
};

export const removeToken = () => {
	localStorage.removeItem("TEST_TASK_TOKEN");
};

export const getToken = (token) => {
	let token_ = localStorage.getItem("TEST_TASK_TOKEN");
	if (token_) {
		return jwtDecode(token_);
	} else if (token) {
		return jwtDecode(token);
	} else {
		return null;
	}
};
