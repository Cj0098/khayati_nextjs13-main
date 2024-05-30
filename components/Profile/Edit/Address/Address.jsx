import { useState, useRef } from "react";

// Libraries
import axios from "axios";

// Components
import Input from "../Input/Input";
import EditButton from "../Input/EditButton";
import SubmitButton from "../Input/SubmitButton";
import { toast } from "react-toastify";

const Address = (props) => {
	const oldAddress = useRef(props.address);
	const [address, setAddress] = useState(props.address);
	const addressError = useRef("");
	const addressRegex =
		/^[ \u0621\u0622\u0623\u0624\u0625\u0626\u0627\u0628\u067e\u062a\u062B\u062C\u0686\u062D\u062E\u062F\u0630\u0631\u0632\u0698\u0633\u0634\u0635\u0636\u0637\u0638\u0639\u063A\u0641\u0642\u06A9\u06AF\u0644\u0645\u0646\u0648\u0647\u06BE\u06CC]+$/;
	const isAddressValid = (a) => a.length > 5 && addressRegex.test(a);
	const addressValid = isAddressValid(address);
	const handleAddressOnChange = (e) => {
		const enteredAddress = e.target.value;
		const properAddress = enteredAddress.replace(/( )+/g, " ");
		if (properAddress) {
			if (isAddressValid(properAddress)) {
				addressError.current = "";
			} else {
				addressError.current = "بیش از 5 حرف، تنها حروف فارسی و فاصله(space)";
			}
		} else {
			addressError.current = "";
		}

		if (properAddress.length === 1 && properAddress === " ") {
			setAddress("");
		} else {
			setAddress(properAddress);
		}
	};

	// Submit
	const [editing, setEditing] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const handleSubmitAddress = async () => {
		if (oldAddress.current !== address) {
			setSubmitting(true);
			try {
				const { data: changeAddressApiResponse } = await axios.post(
					"/auth/updateProfile",
					{
						address: address.trim(),
					},
					{
						headers: {
							authorization: `Bearer ${props.loggedInUserToken}`,
						},
					}
				);

				if (changeAddressApiResponse.isDone) {
					oldAddress.current = address;
					setEditing(false);
					toast.success("آدرس تغییر کرد");
				} else {
					setAddress(oldAddress.current);
					setEditing(false);
					toast.error("خطا در تغییر آدرس");
				}
			} catch (e) {
				toast.error("خطا ارتباط با سرور");
			}
			setSubmitting(false);
		} else {
			setEditing(false);
		}
	};

	return (
		<div>
			<Input title="آدرس">
				<div>
					<input
						type="text"
						readOnly={!editing}
						disabled={!editing}
						value={address}
						onChange={handleAddressOnChange}
						className="block w-full p-2 pl-0 text-lg bg-transparent read-only:opacity-70"
					/>
				</div>

				<div className="p-2 flex-center">
					{!editing && <EditButton onClick={() => setEditing(true)} />}
					{editing && <SubmitButton disabled={!addressValid || submitting} onClick={handleSubmitAddress} />}
				</div>
			</Input>

			{addressError.current && (
				<div>
					<span className="text-sm text-red-500">{addressError.current}</span>
				</div>
			)}
		</div>
	);
};

export default Address;
