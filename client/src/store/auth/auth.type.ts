import { ISignInResponseDto } from "../../services/auth/auth.type";

export interface IAuthState {
	user: ISignInResponseDto["data"] | null;
	isLoading: boolean;
	message: string;
}
