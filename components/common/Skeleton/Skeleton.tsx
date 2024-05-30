// CSS
import styles from "./Skeleton.module.scss";

// Types
type Props = {
	width?: string;
	height?: string;
	aspectRatio?: string;
	borderRadius?: string;
	className?: string;
	style?: React.CSSProperties;
};

const Skeleton = (props: Props) => {
	const {
		width = undefined,
		height = undefined,
		aspectRatio = undefined,
		borderRadius = "0.25rem",
		className = "",
		style = {},
	} = props;

	return (
		<div
			className={`${styles.skeleton} ${className}`}
			style={{ width, height, aspectRatio, borderRadius, ...style }}
		></div>
	);
};

export default Skeleton;
