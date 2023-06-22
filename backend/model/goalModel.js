const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
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
	},
	{
		timestamps: true,
	}
);

module.exports.Goal = mongoose.model("Goal", goalSchema);
