import axios from "axios";

import Cookies from "js-cookie";
import { ISignInResponseDto } from "../services/auth/auth.type";

const cookiedata = Cookies.get("user");
const user: ISignInResponseDto["data"] = cookiedata
	? JSON.parse(cookiedata)
	: null;

const http = axios.create({
	baseURL: "http://localhost:5000/api",
	headers: {
		Authorization: `Bearer ${user.token}`,
	},
});

export default http;
