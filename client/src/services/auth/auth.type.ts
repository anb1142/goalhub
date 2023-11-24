import { AxiosResponse } from "axios";

export interface ISignInRequestDto {
	email: string;
	password: string;
}
export interface IUpdateRequestDto {
	name: string;
	email: string;
}

export type ISignInResponseDto = AxiosResponse<{
	_id: string;
	name: string;
	email: string;
	token: string;
}>;

export interface ISignUpRequestDto {
	name: string;
	email: string;
	password: string;
}
