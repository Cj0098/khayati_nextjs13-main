import React from "react";

// Libraries
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Components
import Space from "components/common/Space/Space";
import Skeleton from "components/common/Skeleton/Skeleton";
import MusicPlayer from "./MusicPlayer/MusicPlayer";

// CSS
import style from "./Music.module.scss";

// Types
type Music = {
	id: number;
	name: string;
	url: string;
};

const Music = () => {
	const fetchMusics = () => axios.post("/musics/archive").then((res) => res.data.data);
	const musics = useQuery<Music[]>(["Musics"], fetchMusics, { retry: true });

	return (
		<main className="py-12 sm:py-20">
			<div className="container">
				<div
					className="p-4 overflow-hidden rounded-3xl md:p-8"
					style={{
						background:
							"linear-gradient(180deg, #FFFFFF 0%, rgba(217, 217, 217, 0) 100%)",
					}}
				>
					<div className="flex flex-col gap-8 text-center text-xl md:text-2xl lg:text-3xl font-bold">
						<p>
							خیاطی شغل شادی هستش ولی چون برخی مواقع دوزندگی کار یکنواختی میشه ،
							موسیقی کمک زیادی به ما میکنه که شاد بمونیم و انرژی کافی برای ادامه ی کار
							رو داشته باشیم
						</p>
						<p>
							برای قسمت فروشگاهی و پذیرش مشتری ، خیلی مهمه که از موسیقی های مناسب
							استفاده کنید چون در کیفیت فروش و افزایش مشتری تاثیر مستقیم داره
						</p>
						<p>
							بخش موسیقی سایت به صورت روزانه ، بروز رسانی میشه و هر بار که موسیقی
							جدیدی ارسال بشه از آخرین موسیقی های ارسالی یک عدد حذف میشه ، اگر از
							موزیکی خوشتون اومد دانلودش کنید که برای همیشه داشته باشید
						</p>
						<p>به خانواده ی شاد لذت خیاطی خوش آمدید</p>
					</div>

					<Space height="4rem" />

					<div>
						{musics.data === undefined ? (
							<div className={`grid gap-8 ${style.MusicsWrapper}`}>
								<Skeleton height="4rem" />
								<Skeleton height="4rem" />
								<Skeleton height="4rem" />
							</div>
						) : (
							<div className={`grid gap-8 md:gap-12 ${style.MusicsWrapper}`}>
								{musics.data.map((music) => (
									<MusicPlayer
										key={`/music|Music-${music.id}`}
										audio={music.url}
										description={music.name}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Music;
