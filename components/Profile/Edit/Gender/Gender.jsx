import { useState, useRef } from "react";

// Libraries
import ReactSelect from "react-select";
import axios from "axios";
import { toast } from "react-toastify";

const Gender = (props) => {
	const oldGender = useRef(props.gender);
	const [gender, setGender] = useState(props.gender);
	let genderOptions = [
		{
			label: "آقا",
			value: "male",
		},
		{
			label: "خانم",
			value: "female",
		},
	];
	const genderOptionByValue = genderOptions.find((option) => option.value === gender);

	const [submitting, setSubmitting] = useState(false);

	const handleGenderOnChange = async (selected) => {
		if (oldGender.current !== selected.value) {
			setSubmitting(true);
			try {
				const { data: changeGenderApiResponse } = await axios.post(
					"/auth/updateProfile",
					{
						gender: selected.value,
					},
					{
						headers: {
							authorization: `Bearer ${props.loggedInUserToken}`,
						},
					}
				);

				if (changeGenderApiResponse.isDone) {
					oldGender.current = selected.value;
					setGender(selected.value);
					toast.success("جنسیت تغییر کرد");
				} else {
					toast.error("خطا در تغییر جنسیت");
				}
			} catch (e) {
				toast.error("خطای ارتباط با سرور");
			}
			setSubmitting(false);
		}
	};

	return (
		<div>
			<div className="mb-px">
				<span className="text-sm">جنسیت :</span>
			</div>
			<div>
				<ReactSelect
					value={genderOptionByValue}
					options={genderOptions}
					isDisabled={submitting}
					isLoading={submitting}
					onChange={handleGenderOnChange}
					styles={{
						control: (provided) => ({
							...provided,
							background: "#D9D9D9",
						}),
					}}
				/>
			</div>
		</div>
	);
};

export default Gender;
