import { FaCheck } from "react-icons/fa";

const SubmitButton = ({ disabled = false, onClick = () => {} }) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`text-lg text-green-600
            ${disabled ? "cursor-default opacity-50" : "cursor-pointer"}`}
		>
			<FaCheck />
		</button>
	);
};

export default SubmitButton;
