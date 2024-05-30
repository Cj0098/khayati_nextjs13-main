/*
	@url: /authentication
	@description: where user can login/signup using their phone number
*/

import { useState, useEffect, useRef, useId } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// Libraries
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import ReactSelect from "react-select";
import DatePicker from "react-multi-date-picker";
import persianDatepicker from "react-date-object/calendars/persian";
import persianDatepickerLocale from "react-date-object/locales/persian_fa";

// Utils
import formatMobileNumber from "utils/formatMobileNumber";

// Context
import { useContext } from "react";
import TokenContext from "context/token/TokenContext";

// CSS
import "react-multi-date-picker/styles/colors/green.css";
import "react-multi-date-picker/styles/layouts/mobile.css";

export default function Authentication() {
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;
	const router = useRouter();
	const { token, setToken } = useContext(TokenContext);

	// ————— M O B I L E - N U M B E R —————
	const [mobileNumber, setMobileNumber] = useState("");
	const mobileNumberError = useRef("");
	const isMobileNumberValid = (mn) => /^(09\d{9})$/.test(mn);
	const mobileNumberValid = isMobileNumberValid(mobileNumber);
	const handleMobileNumberOnChange = (e) => {
		const enteredMobileNumber = e.target.value;
		const properMobileNumber = enteredMobileNumber.replace(/\D/g, "").slice(0, 11);
		if (properMobileNumber) {
			if (isMobileNumberValid(properMobileNumber)) {
				mobileNumberError.current = "";
			} else {
				mobileNumberError.current = "شماره همراه میبایست با 09 آغاز شود و 11 رقم باشد";
			}
		} else {
			mobileNumberError.current = "";
		}
		setMobileNumber(properMobileNumber);
	};

	// ————— V E R I F I C A T I O N - C O D E —————
	const [verificationCode, setVerificationCode] = useState("");
	const verificationCodeError = useRef("");
	const isVerificationCodeValid = (vc) => /^(\d{6})$/.test(vc);
	const verificationCodeValid = isVerificationCodeValid(verificationCode);
	const handleVerificationCodeOnChange = (e) => {
		const enteredVerificationCode = e.target.value;
		const properVerificationCode = enteredVerificationCode.replace(/\D/g, "").slice(0, 6);
		if (properVerificationCode) {
			if (isVerificationCodeValid(properVerificationCode)) {
				verificationCodeError.current = "";
			} else {
				verificationCodeError.current = "میبایست 6 رقم باشد";
			}
		} else {
			verificationCodeError.current = "";
		}
		setVerificationCode(properVerificationCode);
	};

	// ————— F U L L - N A M E —————
	const [fullName, setFullName] = useState("");
	const fullNameError = useRef("");
	const persianCharactersPlusSpaceRegex =
		/^[ \u0621\u0622\u0623\u0624\u0625\u0626\u0627\u0628\u067e\u062a\u062B\u062C\u0686\u062D\u062E\u062F\u0630\u0631\u0632\u0698\u0633\u0634\u0635\u0636\u0637\u0638\u0639\u063A\u0641\u0642\u06A9\u06AF\u0644\u0645\u0646\u0648\u0647\u06BE\u06CC]+$/;
	const isFullNameValid = (fn) => fn.length > 1 && persianCharactersPlusSpaceRegex.test(fn);
	const fullNameValid = isFullNameValid(fullName);
	const handleFullNameOnChange = (e) => {
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

	// ————— G E N D E R —————
	const [gender, setGender] = useState("");
	const isGenderValid = (g) => g === "male" || g === "female";
	const genderValid = isGenderValid(gender);
	const genderReactSelectUniqueInstanceId = useId();
	const handleGenderOnChange = (selected) => {
		setGender(selected.value);
	};

	// ————— B I R T H - D A T E —————
	const [birthdate, setBirthdate] = useState("");
	const birthdateRegex = /^(\d{4})-(\d{2})-(\d{2})$/g;
	const isBirthdateValid = (bd) => birthdateRegex.test(bd);
	const birthdateValid = isBirthdateValid(birthdate);
	const handleBirthdateOnChange = (date) => {
		if (date) {
			if (date.year && date.month && date.day) {
				const properBirthdate = `${date.year}-${
					date.month < 10 ? `0${date.month}` : date.month
				}-${date.day < 10 ? `0${date.day}` : date.day}`;
				setBirthdate(properBirthdate);
			} else {
				setBirthdate("");
			}
		} else {
			setBirthdate("");
		}
	};

	// ————— C I T Y —————
	const [city, setCity] = useState("");
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

	// ————— A D D R E S S —————
	const [address, setAddress] = useState("");
	const addressError = useRef("");
	const isAddressValid = (a) => a.length > 5;
	const addressValid = isAddressValid(address);
	const handleAddressOnChange = (e) => {
		const enteredAddress = e.target.value;
		if (enteredAddress) {
			if (isAddressValid(enteredAddress)) {
				addressError.current = "";
			} else {
				addressError.current = "آدرس یه خورده طولانی تره";
			}
		} else {
			addressError.current = "";
		}
		setAddress(enteredAddress);
	};

	// ————— P O S T A L - C O D E —————
	const [postalCode, setPostalCode] = useState("");
	const postalCodeError = useRef("");
	const isPostalCodeValid = (pc) => pc.length === 10;
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

	// ————— R E F E R —————
	const referReactSelectUniqueInstanceId = useId();
	const [refer, setRefer] = useState("");
	const handleReferOnChange = (selected) => setRefer(selected.value);

	// ————— C O U N T - D O W N —————
	const [countDown, setCountDown] = useState(0);
	const [countDownLoading, setCountDownLoading] = useState(false);
	const deacreaseCountDown = () =>
		setCountDown((current) => {
			if (current > 0) {
				return current - 1;
			}
		});
	useEffect(() => {
		let countDownInterval = setInterval(deacreaseCountDown, 1000);
		if (countDown < 1) {
			clearInterval(countDownInterval);
		}
		return () => clearInterval(countDownInterval);
	}, [countDown]);

	const handleResendVerificationCode = async () => {
		setCountDownLoading(true);
		try {
			const { data: resendVerificationCodeApiResponse } = await axios.post("/auth/sendsms", {
				phone: mobileNumber,
			});

			// اگه درخواست مجدد کد تایید با موفقیت انجام شد
			if (resendVerificationCodeApiResponse.isDone) {
				toast.success("کد مجددا ارسال شد");
				setCountDown(300);
			} else {
				if (
					resendVerificationCodeApiResponse.message ===
					"give it a try for a few more moments"
				) {
					if (
						resendVerificationCodeApiResponse.data.timeleft &&
						typeof resendVerificationCodeApiResponse.data.timeleft === "number"
					) {
						setCountDown(resendVerificationCodeApiResponse.data.timeleft);
					}
				} else {
					toast.error("خطایی رخ داد");
				}
			}
		} catch (e) {
			toast.error("خطای ارتباط با سرور");
		}
		setCountDownLoading(false);
	};

	// ————— S U B M I T S —————
	const [step, setStep] = useState(1);
	const [submitting, setSubmitting] = useState(false);

	// Handle / S T E P - 1
	const stepOneFormValid = mobileNumberValid;
	const handleStepOneSubmit = async () => {
		setSubmitting(true);
		try {
			const { data: sendSmsApiResponse } = await axios.post("/auth/sendsms", {
				phone: mobileNumber,
			});

			if (sendSmsApiResponse.isDone) {
				toast.success("کد ارسال شد");

				// if type === 'register' : go to step 3
				if (sendSmsApiResponse.data.type === "register") {
					setStep(3);
				} else {
					setStep(2);
				}
				setCountDown(300);
			} else {
				if (sendSmsApiResponse.message === "give it a try for a few more moments") {
					if (
						sendSmsApiResponse.data.timeleft &&
						typeof sendSmsApiResponse.data.timeleft === "number"
					) {
						// if type === 'register' : go to step 3
						if (sendSmsApiResponse.data.type === "register") {
							setStep(3);
						} else {
							setStep(2);
						}
						setCountDown(sendSmsApiResponse.data.timeleft);
					}
				} else {
					toast.error("خطایی رخ داد");
				}
			}
		} catch (e) {
			toast.error("خطای ارتباط با سرور");
		}
		setSubmitting(false);
	};

	// Handle / S T E P - 2 / Login
	const stepTwoFormValid = verificationCodeValid;
	const handleStepTwoSubmit = async () => {
		setSubmitting(true);
		try {
			const { data: loginApiResponse } = await axios.post("/auth/sendcode", {
				phone: mobileNumber,
				code: verificationCode,
			});

			if (loginApiResponse.isDone) {
				setToken(loginApiResponse.data.token, { expires: 1 });
				toast.success("خوش آمدید");
				router.push("/");
			} else {
				toast.error("کد وارد شده اشتباه است");
			}
		} catch (e) {
			toast.error("خطای ارتباط با سرور");
		}
		setSubmitting(false);
	};

	// Handle / S T E P - 3 / Signup
	const stepThreeFormValid =
		fullNameValid &&
		genderValid &&
		birthdateValid &&
		cityValid &&
		addressValid &&
		postalCode &&
		refer &&
		verificationCodeValid;
	const handleStepThreeSubmit = async () => {
		setSubmitting(true);
		try {
			const { data: registerApiResponse } = await axios.post("/auth/sendcode", {
				phone: mobileNumber,
				name: fullName.trim(),
				gender: gender,
				birthday: birthdate,
				city: city.trim(),
				address: address,
				postal_code: postalCode,
				refer: refer,
				code: verificationCode,
			});

			if (registerApiResponse.isDone) {
				setToken(registerApiResponse.data.token, { expires: 1 });
				toast.success("حساب ایجاد شد. خوش آمدید");
				router.push("/");
			} else {
				toast.error("کد تایید وارد شده اشتباه است");
			}
		} catch (e) {
			toast.error("خطای ارتباط با سرور");
		}
		setSubmitting(false);
	};

	return (
		<>
			<Head>
				<title>{`ورود/ثبت‌نام — ${appTitle}`}</title>
			</Head>

			<main className="py-12 sm:py-24 lg:py-32">
				<div className="container">
					<div
						className={`w-full max-w-[600px] mx-auto shadow-bsPrimary rounded-2xl py-6`}
					>
						<div className="w-full max-w-[370px] px-2 mx-auto sm:px-0">
							{/* <Head Text> */}
							<div className="mb-5 text-center">
								{step === 1 && (
									<p className="text-sm font-bold">
										شماره تلفن خود را وارد کنید تا کد تایید برای شما پیامک شود
									</p>
								)}

								{step === 2 && (
									<p className="text-sm font-bold">
										کد تایید ارسال شده برای شماره{" "}
										<span dir="ltr">{formatMobileNumber(mobileNumber)}</span> را
										وارد کنید
									</p>
								)}

								{step === 3 && (
									<p className="text-sm font-bold">
										کد تایید به شماره{" "}
										<span dir="ltr">{formatMobileNumber(mobileNumber)}</span>{" "}
										ارسال شد.
										<br />
										جهت تکمیل ثبت‌نام، موارد خواسته شده رو وارد کنید.
									</p>
								)}
							</div>
							{/* </Head Text> */}

							<div>
								{/* <————— S T E P - 1 —————> */}
								{step === 1 && (
									<form onSubmit={(e) => e.preventDefault()}>
										{/* <MobileNumber | Step 1> */}
										<div className="mb-6">
											<div>
												<input
													dir="ltr"
													name="mobileNumber"
													type="tel"
													autoComplete="off"
													placeholder="09—— ——— ————"
													value={formatMobileNumber(mobileNumber)}
													onChange={handleMobileNumberOnChange}
													className={`block text-lg py-2 px-3 w-full rounded-2xl bg-[#D9D9D9]`}
												/>
											</div>

											{/* <MobileNumber Error | Step 1> */}
											{mobileNumberError.current && (
												<div>
													<span className="text-xs text-red-500">
														{mobileNumberError.current}
													</span>
												</div>
											)}
											{/* </MobileNumber Error | Step 1> */}
										</div>
										{/* </MobileNumber | Step 1> */}

										{/* <Submit - SendCode | Step 1> */}
										<div className="flex-center">
											<button
												className="px-4 py-2 text-black bg-lime-400 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
												disabled={!stepOneFormValid || submitting}
												onClick={handleStepOneSubmit}
											>
												{submitting ? (
													<PulseLoader
														size={10}
														color="gray"
														cssOverride={{
															display: "flex",
															alignItems: "center",
														}}
													/>
												) : (
													<span>دریافت کد</span>
												)}
											</button>
										</div>
										{/* </Submit - SendCode | Step 1> */}
									</form>
								)}
								{/* </————— S T E P - 1 —————> */}

								{/* <————— S T E P - 2 - [Login] —————> */}
								{step === 2 && (
									<form onSubmit={(e) => e.preventDefault()}>
										<div className="mb-6">
											{/* <Verification Code | Step 2> */}
											<div className="mb-1">
												<div>
													<input
														dir="ltr"
														type="tel"
														autoComplete="off"
														placeholder="x x x x x x"
														value={verificationCode}
														onChange={handleVerificationCodeOnChange}
														className={`block text-lg rounded p-2 w-full text-center mx-auto bg-[#D9D9D9] ${
															verificationCode ? "tracking-[7px]" : ""
														}`}
													/>
												</div>
											</div>
											{/* </Verification Code | Step 2> */}

											{/* <Resend Code | Step 2> */}
											<div>
												<div className="text-xs">
													{countDown > 0 ? (
														<span>
															درخواست مجدد کد تا {countDown} ثانیه
															دیگر
														</span>
													) : (
														<>
															{countDownLoading ? (
																<BeatLoader size={6} color="gray" />
															) : (
																<span
																	onClick={
																		handleResendVerificationCode
																	}
																	className="cursor-pointer opacity-80 hover:opacity-100 hover:underline"
																>
																	ارسال مجدد کد تایید
																</span>
															)}
														</>
													)}
												</div>
											</div>
											{/* </Resend Code | Step 2> */}
										</div>

										{/* <Submit - Login | Step 2> */}
										<div className="flex-center">
											<button
												className="px-4 py-2 text-black bg-lime-400 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
												disabled={!stepTwoFormValid || submitting}
												onClick={handleStepTwoSubmit}
											>
												{submitting ? (
													<i className="block">
														<PulseLoader
															size={10}
															color="gray"
															cssOverride={{
																display: "flex",
																alignItems: "center",
															}}
														/>
													</i>
												) : (
													<span>ورود</span>
												)}
											</button>
										</div>
										{/* </Submit - Login | Step 2> */}
									</form>
								)}
								{/* </————— S T E P - 2 - [Login] —————> */}

								{/* <————— S T E P - 3 - [Signup] —————> */}
								{step === 3 && (
									<form onSubmit={(e) => e.preventDefault()}>
										<div className="flex flex-col gap-4 mb-6">
											{/* <Full Name> */}
											<div>
												<div>
													<span className="text-sm">
														نام و نام خانوادگی :
													</span>
												</div>
												<div>
													<input
														dir="rtl"
														type="text"
														autoComplete="off"
														placeholder="مثال : علی شعبانی"
														value={fullName}
														onChange={handleFullNameOnChange}
														className={`block rounded p-2 w-full bg-[#D9D9D9]`}
													/>
												</div>
												{/* <Full Name Error> */}
												{fullNameError.current && (
													<div>
														<span className="text-xs text-red-500">
															{fullNameError.current}
														</span>
													</div>
												)}
												{/* </Full Name Error> */}
											</div>
											{/* </Full Name> */}

											{/* <Gender> */}
											<div>
												<div>
													<span className="text-sm">جنسیت :</span>
												</div>
												<div>
													<ReactSelect
														instanceId={
															genderReactSelectUniqueInstanceId
														}
														placeholder="انتخاب کنید ..."
														options={[
															{
																label: "آقا",
																value: "male",
															},
															{
																label: "خانم",
																value: "female",
															},
														]}
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
											{/* </Gender> */}

											{/* <Birthdate> */}
											<div>
												<div>
													<span className="text-sm">تاریخ تولد :</span>
												</div>
												{/* <Desktop Datepicker> */}
												<div dir="ltr" className="hidden md:block">
													<DatePicker
														className="green"
														calendar={persianDatepicker}
														locale={persianDatepickerLocale}
														onChange={handleBirthdateOnChange}
														containerStyle={{ display: "block" }}
														style={{
															display: "block",
															width: "100%",
															height: "auto",
															backgroundColor: "#D9D9D9",
															padding: "0.5rem",
														}}
													/>
												</div>

												{/* <Mobile Datepicker> */}
												<div dir="ltr" className="block md:hidden">
													<DatePicker
														className="rmdp-mobile green"
														calendar={persianDatepicker}
														locale={persianDatepickerLocale}
														onChange={handleBirthdateOnChange}
														containerStyle={{ display: "block" }}
														style={{
															display: "block",
															width: "100%",
															height: "auto",
															backgroundColor: "#D9D9D9",
															padding: "0.5rem",
														}}
													/>
												</div>
											</div>
											{/* </Birthdate> */}

											{/* <City> */}
											<div>
												<div>
													<span className="text-sm">شهر :</span>
												</div>
												<div>
													<input
														type="text"
														placeholder="مثال : تهران"
														value={city}
														onChange={handleCityOnChange}
														className={`block rounded p-2 w-full bg-[#D9D9D9]`}
													/>
												</div>

												{/* <City Error> */}
												{cityError.current && (
													<div>
														<span className="text-xs text-red-500">
															{cityError.current}
														</span>
													</div>
												)}
												{/* </City Error> */}
											</div>
											{/* </City> */}

											{/* <Address> */}
											<div>
												<div>
													<span className="text-sm">آدرس :</span>
												</div>
												<div>
													<input
														type="text"
														placeholder="مثال : خیابان معلم، کوچه 5، پلاک 3"
														value={address}
														onChange={handleAddressOnChange}
														className="block rounded p-2 w-full bg-[#D9D9D9]"
													/>
												</div>

												{/* <Address Error> */}
												{addressError.current && (
													<div>
														<span className="text-xs text-red-500">
															{addressError.current}
														</span>
													</div>
												)}
												{/* </Address Error> */}
											</div>
											{/* </Address */}

											{/* <Postal Code> */}
											<div>
												<div>
													<span className="text-sm">کد پستی :</span>
												</div>
												<div>
													<input
														dir="ltr"
														type="text"
														placeholder="----------"
														value={postalCode}
														onChange={handlePostalCodeOnChange}
														className="block rounded p-2 w-full bg-[#D9D9D9] tracking-[4px]"
													/>
												</div>

												{/* <Postal Code Error> */}
												{postalCodeError.current && (
													<div>
														<span className="text-xs text-red-500">
															{postalCodeError.current}
														</span>
													</div>
												)}
												{/* </Postal Code Error> */}
											</div>
											{/* </Postal Code> */}

											{/* <Refer | Step 3> */}
											<div>
												<div>
													<span className="text-sm">
														چگونه با ما آشنا شدید ؟
													</span>
												</div>
												<div>
													<ReactSelect
														instanceId={
															referReactSelectUniqueInstanceId
														}
														placeholder="انتخاب کنید ..."
														options={[
															// google, telegram, instagram, ads, friends, other
															{
																label: "گوگل",
																value: "google",
																image: "/images/authentication-google.png",
															},
															{
																label: "تلگرام",
																value: "telegram",
																image: "/images/authentication-telegram.png",
															},
															{
																label: "اینستاگرام",
																value: "instagram",
																image: "/images/authentication-instagram.png",
															},
															{
																label: "تبلیغات",
																value: "ads",
																image: "/images/authentication-ads.png",
															},
															{
																label: "دوستان",
																value: "friends",
																image: "/images/authentication-friends.png",
															},
															{
																label: "سایر",
																value: "other",
																image: "/images/authentication-other.png",
															},
														]}
														onChange={handleReferOnChange}
														styles={{
															control: (provided) => ({
																...provided,
																background: "#D9D9D9",
															}),
														}}
													/>
												</div>
											</div>
											{/* </Refer | Step 3> */}

											{/* <Verification Code | Step 3> */}
											<div>
												<div>
													<span className="text-sm">
														کد ارسالی به شماره همراه شما :
													</span>
												</div>
												<div>
													<input
														dir="ltr"
														type="tel"
														autoComplete="off"
														placeholder="x x x x x x"
														value={verificationCode}
														onChange={handleVerificationCodeOnChange}
														className={`block text-lg rounded p-2 w-full text-center mx-auto bg-[#D9D9D9] ${
															verificationCode ? "tracking-[7px]" : ""
														}`}
													/>
												</div>

												{/* <Verification Code Error> */}
												{verificationCodeError.current && (
													<div>
														<span className="text-xs text-red-500">
															{verificationCodeError.current}
														</span>
													</div>
												)}
												{/* </Verification Code Error> */}

												{/* <Resend Code | Step 3> */}
												<div className="mt-1">
													<div className="text-xs">
														{countDown > 0 ? (
															<span>
																درخواست مجدد کد تا {countDown} ثانیه
																دیگر
															</span>
														) : (
															<>
																{countDownLoading ? (
																	<BeatLoader
																		size={6}
																		color="gray"
																	/>
																) : (
																	<span
																		onClick={
																			handleResendVerificationCode
																		}
																		className="cursor-pointer opacity-80 hover:opacity-100 hover:underline"
																	>
																		ارسال مجدد کد تایید
																	</span>
																)}
															</>
														)}
													</div>
												</div>
												{/* </Resend Code | Step 3> */}
											</div>
											{/* </Verification Code | Step 3> */}
										</div>

										{/* <Submit - Signup | Step 3> */}
										<div className="flex-center">
											<button
												className="px-4 py-2 text-black bg-lime-400 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
												disabled={!stepThreeFormValid || submitting}
												onClick={handleStepThreeSubmit}
											>
												{submitting ? (
													<i className="block">
														<PulseLoader
															size={10}
															color="gray"
															cssOverride={{
																display: "flex",
																alignItems: "center",
															}}
														/>
													</i>
												) : (
													<span>ثبت نام</span>
												)}
											</button>
										</div>
										{/* </Submit - Signup | Step 3> */}
									</form>
								)}
								{/* </————— S T E P - 3 - [Signup] —————> */}
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}

export async function getServerSideProps({ req }) {
	const { cookies } = req;

	// if user was logged in : redirect to homepage
	if (cookies.token) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
