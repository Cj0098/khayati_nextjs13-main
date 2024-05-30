import { useState, useRef } from "react";

// Libraries
import axios from "axios";

// Components
import Input from "../Input/Input";
import EditButton from "../Input/EditButton";
import SubmitButton from "../Input/SubmitButton";
import { toast } from "react-toastify";

const PostalCode = (props) => {
	const oldPostalCode = useRef(props.postalCode);
	const [postalCode, setPostalCode] = useState(props.postalCode);
	const postalCodeError = useRef("");
	const isPostalCodeValid = (pc) => pc.length === 10;
	const postalCodeValid = isPostalCodeValid(postalCode);
	const handlePostalCodeOnChange = (e) => {
		const enteredPostalCode = e.target.value;
		const properPostalCode = enteredPostalCode.replace(/\D/g, "").slice(0, 10);
		if (properPostalCode) {
			if (isPostalCodeValid(properPostalCode)) {
				postalCodeError.current = "";
			} else {
				postalCodeError.current = "میبایست 10 رقم باشد";
			}
		} else {
			postalCodeError.current = "";
		}

		setPostalCode(properPostalCode);
	};

	// Submit
	const [editing, setEditing] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const handleSubmitPostalCode = async () => {
		if (oldPostalCode.current === postalCode) {
			setEditing(false);
		} else {
			setSubmitting(true);
			try {
				const { data: changePostalCodeApiResponse } = await axios.post(
					"/auth/updateProfile",
					{
						postal_code: postalCode,
					},
					{
						headers: {
							authorization: `Bearer ${props.loggedInUserToken}`,
						},
					}
				);

				if (changePostalCodeApiResponse.isDone) {
					oldPostalCode.current = postalCode;
					setEditing(false);
					toast.success("کد پستی تغییر کرد");
				} else {
					setPostalCode(oldPostalCode.current);
					setEditing(false);
					toast.error("خطا در تغییر کد پستی");
				}
			} catch (e) {
				toast.error("خطا ارتباط با سرور");
			}
			setSubmitting(false);
		}
	};

	return (
		<div>
			<Input title="کد پستی" ltr>
				<div>
					<input
						type="tel"
						readOnly={!editing}
						disabled={!editing}
						value={postalCode}
						onChange={handlePostalCodeOnChange}
						className="block w-full p-2 pr-0 text-lg bg-transparent read-only:opacity-70 tracking-[4px]"
					/>
				</div>
				<div className="p-2 flex-center">
					{!editing && <EditButton onClick={() => setEditing(true)} />}
					{editing && <SubmitButton disabled={!postalCodeValid || submitting} onClick={handleSubmitPostalCode} />}
				</div>
			</Input>

			{postalCodeError.current && (
				<div>
					<span className="text-sm text-red-500">{postalCodeError.current}</span>
				</div>
			)}
		</div>
	);
};

export default PostalCode;
