import axios from "../axios";
import { ERROR, FINISHED, LOADING, LOGIN, SIGNUP } from "./types";
export const signup = async (data, dispatch) => {
	try {
		dispatch({ type: LOADING });
		dispatch({ type: ERROR, payload: "" });
		let response = await axios.post("/signup", data);
		dispatch({ type: SIGNUP, payload: response.data });
		dispatch({ type: FINISHED });
	} catch (err) {
		console.log(err);
		if (err.response && err.response.data) {
			if (err.response.data.error && err.response.data.error[0]) {
				dispatch({ type: ERROR, payload: err.response.data.error[0] });
			} else {
				dispatch({ type: ERROR, payload: err.response.data.error });
			}
		} else {
			dispatch({ type: ERROR, payload: err.message });
		}
		dispatch({ type: FINISHED });
	}
};

export const login = async (data, dispatch) => {
	try {
		dispatch({ type: LOADING });
		dispatch({ type: ERROR, payload: "" });
		let response = await axios.post("/signin", data);
		dispatch({ type: LOGIN, payload: response.data });
		dispatch({ type: FINISHED });
	} catch (err) {
		if (err.response && err.response.data) {
			if (err.response.data.error && err.response.data.error[0]) {
				dispatch({ type: ERROR, payload: err.response.data.error[0] });
			} else {
				dispatch({ type: ERROR, payload: err.response.data.error });
			}
		} else {
			dispatch({ type: ERROR, payload: err.message });
		}
		dispatch({ type: FINISHED });
	}
};

export const get = async (url, dispatch, type) => {
	try {
		dispatch({ type: LOADING });
		dispatch({ type: ERROR, payload: "" });
		let response = await axios.get(url, {
			headers: { Authorization: `Bearer ${localStorage.getItem("TEST_TASK_TOKEN")}` },
		});
		dispatch({ type: type, payload: response.data });
		dispatch({ type: FINISHED });
	} catch (err) {
		console.log(err);
		if (err.response && err.response.data) {
			dispatch({ type: ERROR, payload: err.response.data.error });
		} else {
			dispatch({ type: ERROR, payload: err.message });
		}
		dispatch({ type: FINISHED });
	}
};

export const add = async (url, data, dispatch, type) => {
	try {
		dispatch({ type: ERROR, payload: "" });
		dispatch({ type: LOADING });
		let response = await axios.post(url, data);
		dispatch({ type: type, payload: response.data });
		dispatch({ type: FINISHED });
	} catch (err) {
		console.log(err);
		if (err.response && err.response.data) {
			if (err.response.data.error && err.response.data.error[0]) {
				dispatch({ type: ERROR, payload: err.response.data.error[0] });
			} else {
				dispatch({ type: ERROR, payload: err.response.data.error });
			}
		} else {
			dispatch({ type: ERROR, payload: err.message });
		}
		dispatch({ type: FINISHED });
	}
};

export const update = async (url, id, data, dispatch, type) => {
	try {
		dispatch({ type: LOADING });
		dispatch({ type: ERROR, payload: "" });
		let response = await axios.put(`${url}/${id}`, data);
		dispatch({ type: type, payload: response.data });
		dispatch({ type: FINISHED });
	} catch (err) {
		console.log(err);
		if (err.response && err.response.data) {
			if (err.response.data.error && err.response.data.error[0]) {
				dispatch({ type: ERROR, payload: err.response.data.error[0] });
			} else {
				dispatch({ type: ERROR, payload: err.response.data.error });
			}
		} else {
			dispatch({ type: ERROR, payload: err.message });
		}
		dispatch({ type: FINISHED });
	}
};

export const delete_ = async (url, id, dispatch, type) => {
	try {
		dispatch({ type: LOADING });
		dispatch({ type: ERROR, payload: "" });
		await axios.delete(`${url}/${id}`);
		dispatch({ type: type, payload: id });
		dispatch({ type: FINISHED });
	} catch (err) {
		console.log(err);
		if (err.response && err.response.data) {
			dispatch({ type: ERROR, payload: err.response.data.error });
		} else {
			dispatch({ type: ERROR, payload: err.message });
		}
		dispatch({ type: FINISHED });
	}
};
