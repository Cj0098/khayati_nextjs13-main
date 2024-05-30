// Context Providers
import { TokenContextProvider } from "./token/TokenContext";

// Typescript
type Props = {
	children: JSX.Element | JSX.Element[];
};

const ContextProvider = (props: Props) => {
	return <TokenContextProvider>{props.children}</TokenContextProvider>;
};

export default ContextProvider;
