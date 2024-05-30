// Libraries
import { ClipLoader } from "react-spinners";

const Loading = (props) => {
	return (
		<div className="w-full h-full flex-center">
			<ClipLoader size={50} />
		</div>
	);
};

export default Loading;
