import { MdOutlineModeEditOutline } from "react-icons/md";

const EditButton = ({ onClick = () => {} }) => {
	return (
		<button onClick={onClick} className="text-lg text-amber-500 cursor-pointer">
			<MdOutlineModeEditOutline />
		</button>
	);
};

export default EditButton;
