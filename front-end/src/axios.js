import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:3001",
	headers: { Authorization: `Bearer ${localStorage.getItem("TEST_TASK_TOKEN")}` },
});

export default instance;
