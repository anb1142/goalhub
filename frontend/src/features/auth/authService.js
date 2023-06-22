import axios from "axios";
const API_URL = "http://localhost:5000/api/users/";
import Cookies from "js-cookie";

const save_cookie = (name, data) => {
	Cookies.set(name, JSON.stringify(data), { expires: 365, sameSite: "strict" });
};
const register = async (userData) => {
	const res = await axios.post(API_URL, userData);

	if (res.data) save_cookie("user", res.data);

	return res.data;
};

const login = async (userData) => {
	const res = await axios.post(API_URL + `login`, userData);

	if (res.data) save_cookie("user", res.data);

	return res.data;
};
const logout = () => {
	Cookies.remove("user");
};
const authService = {
	register,
	logout,
	login,
};

export default authService;
