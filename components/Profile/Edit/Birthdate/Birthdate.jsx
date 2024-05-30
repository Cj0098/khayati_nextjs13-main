import { useState, useRef } from "react";

// Libraries
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-multi-date-picker";
import persianDatepicker from "react-date-object/calendars/persian";
import persianDatepickerLocale from "react-date-object/locales/persian_fa";

// Components
import Input from "../Input/Input";
import EditButton from "../Input/EditButton";
import SubmitButton from "../Input/SubmitButton";

// CSS
import "react-multi-date-picker/styles/colors/green.css";
import "react-multi-date-picker/styles/layouts/mobile.css";

const Birthdate = (props) => {
	const oldBirthdate = useRef(props.birthdate);
	const [birthdate, setBirthdate] = useState(props.birthdate);
	const birthdateRegex = /^(\d{4})-(\d{2})-(\d{2})$/g;
	const isBirthdateValid = (bd) => birthdateRegex.test(bd);
	const birthdateValid = isBirthdateValid(birthdate);
	const handleBirthdateOnChange = (date) => {
		if (date) {
			if (date.year && date.month && date.day) {
				const properBirthdate = `${date.year}-${date.month < 10 ? `0${date.month}` : date.month}-${
					date.day < 10 ? `0${date.day}` : date.day
				}`;
				setBirthdate(properBirthdate);
			}
		}
	};

	// Submit
	const [editing, setEditing] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const handleSubmitBirthdate = async () => {
		if (oldBirthdate.current !== birthdate) {
			setSubmitting(true);
			try {
				const { data: changeBirthdateApiResponse } = await axios.post(
					"/auth/updateProfile",
					{
						birthday: birthdate,
					},
					{
						headers: {
							authorization: `Bearer ${props.loggedInUserToken}`,
						},
					}
				);

				if (changeBirthdateApiResponse.isDone) {
					oldBirthdate.current = birthdate;
					setEditing(false);
					toast.success("تاریخ تولد تغییر کرد");
				} else {
					setBirthdate(oldBirthdate.current);
					setEditing(false);
					toast.error("خطا در تغییر تاریخ تولد");
				}
			} catch (e) {
				toast.error("خطای ارتباط با سرور");
			}
			setSubmitting(false);
		} else {
			setEditing(false);
		}
	};

	return (
		<Input ltr title="تاریخ تولد">
			{/* <Desktop Datepicker> */}
			<div className="hidden md:block">
				<DatePicker
					className="green"
					calendar={persianDatepicker}
					locale={persianDatepickerLocale}
					disabled={!editing}
					readOnly={!editing}
					format="YYYY-MM-DD"
					value={birthdate}
					onChange={handleBirthdateOnChange}
					containerStyle={{ display: "block", height: "100%" }}
					style={{
						display: "block",
						width: "100%",
						height: "auto",
						backgroundColor: "#D9D9D9",
						padding: "0.5rem",
						border: "none",
						boxShadow: "none",
						opacity: `${editing ? "1" : "0.7"}`,
					}}
				/>
			</div>

			{/* <Mobile Datepicker> */}
			<div className="block md:hidden">
				<DatePicker
					className="rmdp-mobile green"
					calendar={persianDatepicker}
					locale={persianDatepickerLocale}
					disabled={!editing}
					readOnly={!editing}
					format="YYYY-MM-DD"
					value={birthdate}
					onChange={handleBirthdateOnChange}
					containerStyle={{ display: "block", height: "100%" }}
					style={{
						display: "block",
						width: "100%",
						height: "auto",
						backgroundColor: "#D9D9D9",
						padding: "0.5rem",
						border: "none",
						boxShadow: "none",
						opacity: `${editing ? "1" : "0.7"}`,
					}}
				/>
			</div>
			<div className="p-2 flex-center">
				{!editing && <EditButton onClick={() => setEditing(true)} />}
				{editing && <SubmitButton disabled={!birthdateValid || submitting} onClick={handleSubmitBirthdate} />}
			</div>
		</Input>
	);
};

export default Birthdate;
