import { useState, useEffect, useRef } from "react";

// Hooks
import useUserQuery from "../../../../hooks/useUserQuery";

// Libraries
import axios from "axios";
import { toast } from "react-toastify";

// Components
import Input from "../Input/Input";
import EditButton from "../Input/EditButton";
import SubmitButton from "../Input/SubmitButton";

const FullName = (props) => {
	const user = useUserQuery();

	// ————— Full Name —————
	const oldFullName = useRef(props.fullName || "");
	const fullNameInputElement = useRef("");
	const [fullName, setFullName] = useState(props.fullName || "");
	const fullNameError = useRef("");
	const persianCharactersPlusSpaceRegex =
		/^[ \u0621\u0622\u0623\u0624\u0625\u0626\u0627\u0628\u067e\u062a\u062B\u062C\u0686\u062D\u062E\u062F\u0630\u0631\u0632\u0698\u0633\u0634\u0635\u0636\u0637\u0638\u0639\u063A\u0641\u0642\u06A9\u06AF\u0644\u0645\u0646\u0648\u0647\u06BE\u06CC]+$/;
	const isFullNameValid = (fn) => fn.length > 1 && persianCharactersPlusSpaceRegex.test(fn);
	const fullNameValid = isFullNameValid(fullName);
	const fullNameOnChange = (e) => {
		const enteredFullName = e.target.value;
		const properFullName = enteredFullName.replace(/( )+/g, " ").slice(0, 32);
		if (properFullName) {
			if (isFullNameValid(properFullName)) {
				fullNameError.current = "";
			} else {
				fullNameError.current = "بیش از 1 حرف، تنها حروف فارسی و فاصله(space)";
			}
		} else {
			fullNameError.current = "";
		}

		if (properFullName.length === 1 && properFullName === " ") {
			setFullName("");
		} else {
			setFullName(properFullName);
		}
	};

	// ————— Edit Mode —————
	const [editing, setEditing] = useState(false);
	useEffect(() => {
		if (editing === true) {
			fullNameInputElement.current.focus();
		}
	}, [editing]);

	// ————— Submit new Full Name —————
	const [submitting, setSubmitting] = useState(false);
	const handleUpdateFullName = async () => {
		if (oldFullName.current === fullName) {
			setEditing(false);
		} else {
			setSubmitting(true);
			try {
				const { data: changeFullNameApiResponse } = await axios.post(
					"/auth/updateProfile",
					{
						name: fullName.trim(),
					},
					{
						headers: {
							authorization: `Bearer ${props.loggedInUserToken}`,
						},
					}
				);

				if (changeFullNameApiResponse.isDone) {
					oldFullName.current = fullName;
					setEditing(false);
					user.refetch();
					toast.success("نام بروزرسانی شد");
				} else {
					setFullName(oldFullName.current);
					setEditing(false);
					toast.error("در بروزرسانی نام خطا رخ داد");
				}
			} catch (e) {
				toast.error("خطا ارتباط با سرور");
			}
			setSubmitting(false);
		}
	};

	return (
		<div>
			<Input title="نام و نام خانوادگی">
				<div>
					<input
						ref={fullNameInputElement}
						type="text"
						readOnly={!editing}
						disabled={!editing}
						value={fullName}
						onChange={fullNameOnChange}
						className="block w-full p-2 pl-0 text-lg bg-transparent read-only:opacity-70"
					/>
				</div>
				<div className="p-2 flex-center">
					{!editing && <EditButton onClick={() => setEditing(true)} />}
					{editing && <SubmitButton disabled={!fullNameValid || submitting} onClick={handleUpdateFullName} />}
				</div>
			</Input>

			{fullNameError.current && (
				<div>
					<span className="text-sm text-red-500">{fullNameError.current}</span>
				</div>
			)}
		</div>
	);
};

export default FullName;
