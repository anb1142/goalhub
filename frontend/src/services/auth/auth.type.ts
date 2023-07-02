import { AxiosResponse } from "axios";

export interface ISignInRequestDto {
	email: string;
	password: string;
}

export type ISignInResponseDto = AxiosResponse<{
	_id: string;
	name: string;
	email: string;
	token: string;
}>;
