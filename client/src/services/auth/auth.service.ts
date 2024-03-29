import Cookies from "js-cookie";
import http from "../../utils/http";
import {
	ISignInRequestDto,
	ISignInResponseDto,
	ISignUpRequestDto,
	IUpdateRequestDto,
} from "./auth.type";

const API_URL = "/users/";

const save_cookie = (name: string, data: ISignInResponseDto) => {
	Cookies.set(name, JSON.stringify(data), { expires: 100, sameSite: "Strict" });
};

const login = async (
	userData: ISignInRequestDto
): Promise<ISignInResponseDto> => {
	const res = await http.post(API_URL + `login`, userData);
	if (res.data) save_cookie("user", res.data);
	return res;
};
const update = async (
	userData: IUpdateRequestDto
): Promise<ISignInResponseDto> => {
	const res = await http.put(API_URL, userData);
	if (res.data) save_cookie("user", res.data);
	return res;
};

const getMe = async (): Promise<ISignInResponseDto> => {
	return await http.get(API_URL + `me`);
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

const remove = async (): Promise<boolean> => {
	const res = await http.delete(API_URL);
	return res.status === 200 ? true : false;
};

const authService = {
	update,
	login,
	remove,
	logout,
	register,
	getMe,
};

export default authService;
