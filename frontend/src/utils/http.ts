import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
// import { enqueueSnackbar } from "notistack";
import { toast } from "react-toastify";
import { ISignInResponseDto } from "../services/auth/auth.type";

const baseUrl = "http://localhost:5000/api";

const http = axios.create({
	baseURL: baseUrl,
});

http.interceptors.request.use(
	async (config) => {
		const cookiedata = Cookies.get("user");
		const user: ISignInResponseDto["data"] = cookiedata
			? JSON.parse(cookiedata)
			: null;
		try {
			config.headers.Authorization = `Bearer ${user?.token ? user.token : ""}`;
			return config;
		} catch (error) {
			throw error;
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);

http.interceptors.response.use(
	(res) => res,
	(error) => {
		console.log(error);
		if (error instanceof AxiosError) {
			const msg = error.response?.data.message;
			toast.error(msg ? msg : error.message);
		}
		return Promise.reject(error);
	}
);

export default http;
