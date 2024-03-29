import { ISignInResponseDto } from "../../services/auth/auth.type";

export type IUserState = ISignInResponseDto["data"] | null;

export interface IAuthState {
	user: IUserState;
	isLoading: boolean;
	message: string;
}
