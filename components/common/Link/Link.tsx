import NextLink from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

// Types
type Props = {
	href: string;
	target?: HTMLAttributeAnchorTarget;
	rel?: string;
	title?: string;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
	className?: string;
	style?: React.CSSProperties;
	children: JSX.Element | JSX.Element[] | string;
};

const Link = (props: Props) => {
	return (
		<NextLink
			href={props.href}
			prefetch={false}
			title={props.title}
			target={props.target}
			rel={props.rel}
			className={props.className}
			style={props.style}
		>
			{props.children}
		</NextLink>
	);
};

export default Link;
