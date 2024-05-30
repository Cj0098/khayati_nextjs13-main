import React, { useEffect, useState } from "react";

// Libraries
import Cookies from "js-cookie";

// Types
type ContextProps = {
	token: string | false;
	setToken: Function;
};

type Props = {
	children: JSX.Element | JSX.Element[];
};

const TokenContext = React.createContext<ContextProps>({ token: false, setToken: () => {} });
export function TokenContextProvider(props: Props) {
	const [token, setTheToken] = useState<string | false>(false);

	const setToken = (newValue: string | false, config: object = {}) => {
		setTheToken(newValue);

		// If 'string' was passed : Set Token in Cookies
		if (typeof newValue === "string") {
			Cookies.set("token", newValue, config);
		}

		// If 'false' was passed : Remove Token From Cookies
		if (newValue === false) {
			Cookies.remove("token");
		}
	};

	// Initial : Set Token Context if there was a token cookie available in browser storage
	useEffect(() => {
		const token = Cookies.get("token");
		if (typeof token === "string") {
			setToken(token);
		}
	}, []);

	return (
		<TokenContext.Provider value={{ token, setToken }}>{props.children}</TokenContext.Provider>
	);
}

export default TokenContext;
