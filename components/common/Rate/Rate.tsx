/*
	@description: ReadOnly Star Rate Component Using Material UI
	@props: {
		score: <Null|Number> | between 1 to 5 | optional
		size: <String> | 'small', 'medium', 'large' | optional
	}
*/

// MUI
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

// Types
type Props = {
	score?: number | null;
	size?: "large" | "medium" | "small";
};

const Rate = (props: Props) => {
	const { score = null, size = "medium" } = props;

	return (
		<Rating
			value={score}
			precision={0.1}
			size={size}
			icon={<StarIcon fontSize="inherit" />}
			emptyIcon={<StarIcon fontSize="inherit" />}
			readOnly
		/>
	);
};

export default Rate;
