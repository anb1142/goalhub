import { Backdrop, CircularProgress } from "@mui/material";

const Spinner = () => (
	<Backdrop
		open={true}
		sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
	>
		<CircularProgress color="inherit" />
	</Backdrop>
);

export default Spinner;
