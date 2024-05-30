import React from "react";

// Types
type Props = {
	height: string;
};

const Space = (props: Props) => {
	return (
		<div
			style={{
				minWidth: "100%",
				width: "100%",
				maxWidth: "100%",
				minHeight: props.height,
				height: props.height,
				maxHeight: props.height,
			}}
		></div>
	);
};

export default Space;
