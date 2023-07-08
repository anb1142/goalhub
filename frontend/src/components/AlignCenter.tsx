import { Container } from "@mui/material";
import React from "react";

function AlignCenter(props: {
	children: React.ReactNode;
	mt?: string | number;
}) {
	return (
		<Container
			className="login"
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				mt: props.mt ? props.mt : 16,
				width: "100%",
			}}
		>
			{props.children}
		</Container>
	);
}

export default AlignCenter;
