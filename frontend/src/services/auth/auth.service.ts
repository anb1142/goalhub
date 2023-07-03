import Cookies from "js-cookie";
import http from "../../utils/http";
import {
	ISignInRequestDto,
	ISignInResponseDto,
	ISignUpRequestDto,
} from "./auth.type";

const API_URL = "/users/";

const save_cookie = (name: string, data: ISignInResponseDto) => {
	Cookies.set(name, JSON.stringify(data), { expires: 365, sameSite: "Strict" });
};

const login = async (
	userData: ISignInRequestDto
): Promise<ISignInResponseDto> => {
	const res = await http.post(API_URL + `login`, userData);
	if (res.data) save_cookie("user", res.data);
	return res;
};

const register = async (
	userData: ISignUpRequestDto
): Promise<ISignInResponseDto> => {
	const res = await http.post(API_URL, userData);
	if (res.data) save_cookie("user", res.data);
	return res;
};

const logout = () => {
	Cookies.remove("user");
};

const authService = {
	login,
	logout,
	register,
};

export default authService;
