const Guide = () => {
	const storage = process.env.NEXT_PUBLIC_BACKEND_STORAGE;
	const videosArray = [
		{
			url: storage + "/uploads/نمای-کلی_2023-01-09-15:13:37.mp4",
			name: "نمای کلی",
			id: 1,
		},
		{
			url: storage + "/uploads/خرازی_2023-01-09-15:12:19.mp4",
			name: " خرازی لذت خیاطی",
			id: 1,
		},
		{
			url: storage + "/uploads/پروفایل_2023-01-09-15:11:58.mp4",
			name: "نحوه ورود به پروفایل",
			id: 1,
		},
		{
			url: storage + "/uploads/آموزش-رایگان_2023-01-09-15:11:13.mp4",
			name: "آموزش های رایگان",
			id: 1,
		},
		{
			url: storage + "/uploads/اطلاعات-کلاس_2023-01-09-15:10:33.mp4",
			name: "مشاهده اطلاعات کلاس ها",
			id: 1,
		},
	];
	return (
		<div>
			<div className="container my-5">
				<h1 className="my-3 text-center" style={{ fontSize: "40px" }}>
					راهنمای سایت
				</h1>
				<div class="grid grid-cols-2 gap-4 items-center">
					{videosArray.map(({ name, id, url }) => (
						<div key={id}>
							{console.log(name)}
							<video controls>
								<source src={url} type="video/mp4" />
								Your browser does not support the video tag.
							</video>
							<center>
								<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded-full ">
									{name}
								</button>
							</center>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Guide;
