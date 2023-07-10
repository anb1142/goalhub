import mongoose, { ObjectId } from "mongoose";
export interface IUser {
	_id: ObjectId;
	name: string;
	email: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
	{
		name: {
			type: String,
			required: [true, "Name required"],
		},
		email: {
			type: String,
			required: [true, "email required"],
			unique: true,
		},
		password: {
			type: String,
			required: [true, "password required"],
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
