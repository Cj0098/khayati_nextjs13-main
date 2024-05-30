import { useState, useRef } from "react";

// Libraries
import axios from "axios";

// Components
import Input from "../Input/Input";
import EditButton from "../Input/EditButton";
import SubmitButton from "../Input/SubmitButton";
import { toast } from "react-toastify";

const City = (props) => {
	const oldCity = useRef(props.city);
	const [city, setCity] = useState(props.city);
	const cityError = useRef("");
	const cityRegex =
		/^[ \u0621\u0622\u0623\u0624\u0625\u0626\u0627\u0628\u067e\u062a\u062B\u062C\u0686\u062D\u062E\u062F\u0630\u0631\u0632\u0698\u0633\u0634\u0635\u0636\u0637\u0638\u0639\u063A\u0641\u0642\u06A9\u06AF\u0644\u0645\u0646\u0648\u0647\u06BE\u06CC]+$/;
	const isCityValid = (c) => c.length > 1 && cityRegex.test(c);
	const cityValid = isCityValid(city);
	const handleCityOnChange = (e) => {
		const enteredCity = e.target.value;
		const properCity = enteredCity.replace(/( )+/g, " ").slice(0, 32);
		if (properCity) {
			if (isCityValid(properCity)) {
				cityError.current = "";
			} else {
				cityError.current = "بیش از 1 حرف، تنها حروف فارسی و فاصله(space)";
			}
		} else {
			cityError.current = "";
		}

		if (properCity.length === 1 && properCity === " ") {
			setCity("");
		} else {
			setCity(properCity);
		}
	};

	// Submit
	const [editing, setEditing] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const handleSubmitCity = async () => {
		if (oldCity.current !== city) {
			setSubmitting(true);
			try {
				const { data: changeCityApiResponse } = await axios.post(
					"/auth/updateProfile",
					{
						city: city.trim(),
					},
					{
						headers: {
							authorization: `Bearer ${props.loggedInUserToken}`,
						},
					}
				);

				if (changeCityApiResponse.isDone) {
					oldCity.current = city;
					setEditing(false);
					toast.success("شهر تغییر کرد");
				} else {
					setCity(oldCity.current);
					setEditing(false);
					toast.error("خطا در تغییر شهر");
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
			<Input title="شهر">
				<div>
					<input
						type="text"
						readOnly={!editing}
						disabled={!editing}
						value={city}
						onChange={handleCityOnChange}
						className="block w-full p-2 pl-0 text-lg bg-transparent read-only:opacity-70"
					/>
				</div>
				<div className="p-2 flex-center">
					{!editing && <EditButton onClick={() => setEditing(true)} />}
					{editing && <SubmitButton disabled={!cityValid || submitting} onClick={handleSubmitCity} />}
				</div>
			</Input>

			{cityError.current && (
				<div>
					<span className="text-sm text-red-500">{cityError.current}</span>
				</div>
			)}
		</div>
	);
};

export default City;
