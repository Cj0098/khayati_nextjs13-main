import Head from "next/head";

// Libraries
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";

// Components
import Profile from "components/Profile/Profile";
import BookmarkedSkeleton from "components/Profile/Bookmarks/BookmarkedSkeleton/BookmarkedSkeleton";
import BookmarkedItem from "components/Profile/Bookmarks/BookmarkedItem/BookmarkedItem";

export default function ProfileBookmarks({ loggedInUserToken }) {
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;

	const fetchBookmarkedCourses = (token) =>
		axios
			.get("/auth/bookmarks/course", {
				headers: {
					authorization: `Bearer ${token}`,
				},
			})
			.then((res) => res.data.data);
	const bookmarkedCourses = useQuery(
		["Profile", "Bookmarks", "Courses"],
		() => fetchBookmarkedCourses(loggedInUserToken),
		{
			retry: true,
			staleTime: 10 * 1000,
		}
	);

	const fetchBookmarkedArticles = (token) =>
		axios
			.get("/auth/bookmarks/post", {
				headers: {
					authorization: `Bearer ${token}`,
				},
			})
			.then((res) => res.data.data);
	const bookmarkedArticles = useQuery(
		["Profile", "Bookmarks", "Posts"],
		() => fetchBookmarkedArticles(loggedInUserToken),
		{
			retry: true,
			staleTime: 10 * 1000,
		}
	);

	return (
		<>
			<Head>
				<title>{`علاقه‌مندی ها — ${appTitle}`}</title>
			</Head>

			<Profile>
				<div className="w-full max-w-[600px] p-4 mx-auto shadow-lg bg-background rounded-2xl">
					<div className="mb-8">
						<h2 className="text-lg text-center text-bold">علاقه‌مندی ها</h2>
					</div>

					{/* ——— <Bookmarked Courses> ——— */}
					<section className="mb-8">
						<div className="mb-2">
							<h3 className="text-gray-700">دوره ها :</h3>
						</div>

						{bookmarkedCourses.isLoading && (
							<ul className="flex flex-col gap-2">
								<BookmarkedSkeleton />
								<BookmarkedSkeleton />
								<BookmarkedSkeleton />
							</ul>
						)}

						{!bookmarkedCourses.isLoading && (
							<>
								{bookmarkedCourses.data.length === 0 && (
									<div>
										<span>دوره‌ای در علاقه‌مندی ها نیست!</span>
									</div>
								)}

								{bookmarkedCourses.data.length > 0 && (
									<ul>
										{bookmarkedCourses.data.map(({ course }) => (
											<BookmarkedItem
												key={uuid()}
												image={course[0].img}
												title={course[0].name}
												url={`/course/${course[0].id}/${course[0].slug}`}
											/>
										))}
									</ul>
								)}
							</>
						)}
					</section>

					{/* ——— <Bookmarked Articles> ——— */}
					<section>
						<div className="mb-2">
							<h3 className="text-gray-700">مقالات :</h3>
						</div>

						{bookmarkedArticles.isLoading && (
							<ul className="flex flex-col gap-2">
								<BookmarkedSkeleton />
								<BookmarkedSkeleton />
								<BookmarkedSkeleton />
							</ul>
						)}

						{!bookmarkedArticles.isLoading && (
							<>
								{bookmarkedArticles.data.length === 0 && (
									<div>
										<span>مقاله‌ای در علاقه‌مندی ها نیست!</span>
									</div>
								)}

								{bookmarkedArticles.data.length > 0 && (
									<ul>
										{bookmarkedArticles.data.map(({ post }) => (
											<BookmarkedItem
												key={uuid()}
												image={post[0].img}
												title={post[0].name}
												url={`/article/${post[0].id}/${post[0].slug}`}
											/>
										))}
									</ul>
								)}
							</>
						)}
					</section>
				</div>
			</Profile>
		</>
	);
}

export async function getServerSideProps({ req }) {
	const { cookies } = req;

	// if user was not logged in : redirect to homepage
	if (!cookies.token) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			loggedInUserToken: cookies.token,
		},
	};
}
