import axios from "axios";
import Cookies from "js-cookie";
import { ISignInRequestDto, ISignInResponseDto } from "./auth.type";
const API_URL = "http://localhost:5000/api/users/";

const save_cookie = (name: string, data: ISignInResponseDto) => {
	Cookies.set(name, JSON.stringify(data), { expires: 365, sameSite: "strict" });
};

const login = async (
	userData: ISignInRequestDto
): Promise<ISignInResponseDto> => {
	const res = await axios.post(API_URL + `login`, userData);
	if (res.data) save_cookie("user", res.data);
	return res;
};

const logout = () => {
	Cookies.remove("user");
};

const authService = {
	login,
	logout,
};

export default authService;
