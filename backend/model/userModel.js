const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
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

module.exports = {
	User: mongoose.model("User", userSchema),
};
