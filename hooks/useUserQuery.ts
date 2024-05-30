import { useUpdateEffect } from "react-use";

// Context
import { useContext } from "react";
import TokenContext from "context/token/TokenContext";

// Libraries
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Types
type User = {
	address: string;
	avatar: string | null;
	birthday: string;
	city: string;
	gender: "male" | "female";
	id: number;
	name: string;
	phone: string;
	postal_code: string;
	refer: string;
	role: "user" | "admin";
};

const useUserQuery = () => {
	const { token: loggedInUserToken } = useContext(TokenContext);

	const fetchUser = (token: string | false) =>
		axios
			.get("/auth/profile", {
				headers: {
					authorization: `Bearer ${token}`,
				},
			})
			.then((res) => res.data.data);
	const user = useQuery<User>(["User"], () => fetchUser(loggedInUserToken), {
		enabled: loggedInUserToken ? true : false,
		retry: true,
		staleTime: Infinity,
	});

	return user;
};

export default useUserQuery;
