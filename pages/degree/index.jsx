import { useState } from "react";

const Degree = () => {
	const [data, setData] = useState();
	const [degree, setDegree] = useState();
	const submitDegree = async () => {
		const fetchDegree = await fetch("https://lezatkhayati.com/api/degree/" + degree)
			.then((response) => response.json())
			.then((data) => setData(data));
		// axios.get("https://lezatkhayati.com/api/degree/" + degree).then((res) => res.data.data);

		console.log(data);
	};

	if (!data)
		return (
			<div className="container mx-auto my-4 bg-white rounded-lg p-4 shadow-md text-center">
				<h1 className="text-[20px]">دریافت گواهینامه </h1>
				<p>برای مشاهده مدرک کد ملی خود را در کادر زیر وارد نمایید </p>
				<div className="grid  justify-center my-4">
					<div className="flex w-96 items-center">
						<span>کد ملی : </span>
						<input
							type="text"
							className="mr-2 bg-gray-100 shadow-md rounded-lg grow px-2 py-1"
							placeholder="اینجا وارد کنید"
							onChange={(evt) => {
								setDegree(evt.target.value);
							}}
						/>
					</div>
					<button className="bg-cyan-400 rounded-lg px-1 py-2 m-2" onClick={submitDegree}>
						ثبت و دریافت گواهینامه
					</button>
				</div>
			</div>
		);
	else if (!data.data.name)
		return (
			<div className="text-center ">
				<h1>گواهینامه ای با کد ملی وارد شده یافت نشد</h1>
				<button onClick={setData(undefined)}>بازگشت</button>
			</div>
		);
	else
		return (
			<div className="container mx-auto my-4 bg-white rounded-lg p-4 shadow-md text-center">
				<div className="grid grid-cols-12 ">
					{/* <div className="col-span-8 bg-[url('/images/logo.png')] bg-center bg-no-repeat bg-cover backdrop-blur-md"> */}
					<div className="col-span-8 ">
						<h1 className="text-[40px] bg-white">
							<span className="drop-shadow-lg">آکادمی</span>
							<br /> لذت خیاطی
						</h1>
						<hr />
						<h2 className="text-[35px]">گواهینامه مهارت حرفه ای</h2>
						<p className="tracking-wider text-justify">
							گواهی میشود آقا/ خانم
							{":" + data.data.name}
							<br />
							به شماره شناسنامه / کد ملی 1234 صادره از کرج فرزند مقدم حرفه : صنایع
							پوشاک دوره آموزشی نازک دوزی را به مدت 4 مهارت از تاریخ 1402/04/05 تا
							تاریخ 1402/04/05 به درجه عالی زیر نظر استاد مقدم جو با موفقیت طی نموده
						</p>
					</div>
					<div className="col-span-4">
						<img src="/images/big-logo.png" className="w-full h-96" alt="" srcset="" />
					</div>
				</div>
			</div>
		);
};

export default Degree;
