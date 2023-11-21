import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth/auth.slice";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate();
	const { user, isLoading } = useAuth();

	useEffect(() => {
		if (!isLoading && !user?.token) navigate("/login");
	}, [user, isLoading]);
	return <>{children}</>;
};

export default ProtectedRoute;
