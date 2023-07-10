import mongoose, { ObjectId } from "mongoose";

export interface IGoal {
	user: ObjectId;
	text: string;
	done: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
const goalSchema = new mongoose.Schema<IGoal>(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		text: {
			type: String,
			require: [true, "Text: required"],
		},
		done: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Goal = mongoose.model<IGoal>("Goal", goalSchema);
export default Goal;
