// Icons
import { BsFillPlayCircleFill } from "react-icons/bs";
import { BsPlayFill } from "react-icons/bs";

// CSS
import style from "./Lesson.module.scss";

const Lesson = ({ title, active = false, onClick }) => (
	<div className={`${style.Lesson}`}>
		<button
			className={`flex w-full items-center gap-2 px-2 py-3 sm:px-4 ${
				active ? "bg-black/20" : "hover:bg-black/10"
			}`}
			onClick={onClick}
		>
			<div>
				<i
					className={`block text-xl text-green-500
					${active ? "text-red-400" : ""}`}
				>
					<BsFillPlayCircleFill />
				</i>
			</div>
			<div>
				<span className="text-lg">{title}</span>
			</div>

			<div className="mr-auto">
				<i>
					<BsPlayFill />
				</i>
			</div>
		</button>
	</div>
);

export default Lesson;
