import { useState } from "react";

// Components
import MainContainer from "components/common/MainContainer/MainContainer";
import JournalSkeleton from "./JournalSkeleton/ArticleSkeleton";
import Journal from "./Journal/Journal";

// Libraries
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const journalsSubCategories = [
	{ id: 2, title: "ژورنال‌های عمومی", color: "#EA9F1D" },
	{ id: 3, title: "ژورنال‌های استاد مقدم جو", color: "#ea42f7" },
	{ id: 4, title: "ژورنال‌های هنرجویان", color: "#21cbef" },
];

const Filter = ({ categoryId, title, color, active, onClick }) => (
	<li
		onClick={onClick}
		style={{ color: color }}
		className={`cursor-pointer py-2 px-3 bg-[#eeeff4] rounded-xl overflow-hidden duration-500 shadow-bsPrimary hover:shadow-bsPrimaryInset 
		${active ? "text-blue-500 opacity-100 px-16" : "opacity-70"}
		`}
	>
		<span className="drop-shadow-md">{title}</span>
	</li>
);

const Journals = () => {
	const [activeCategoryId, setActiveCategoryId] = useState(false);
	const handleSetActiveCategoryId = (newCategoryId) => {
		setActiveCategoryId((oldCategoryId) => {
			if (oldCategoryId === newCategoryId) {
				return false;
			} else {
				return newCategoryId;
			}
		});
	};

	const fetchJournals = (activeCategoryId) => {
		if (activeCategoryId) {
			return axios.get(`/posts/cat/${activeCategoryId}`).then((res) => res.data.data);
		} else {
			return axios.post(`/journals`).then((res) => {
				return { posts: res.data.data };
			});
		}
	};

	const journals = useQuery(
		["Journals", `Category-${activeCategoryId ? activeCategoryId : "All"}`],
		() => fetchJournals(activeCategoryId),
		{
			retry: true,
			staleTime: Infinity,
		}
	);

	return (
		<MainContainer>
			{/* ——— <Filter Journals> ——— */}
			<div className="mb-8">
				<div className="mb-2">
					<span className="opacity-70">دسته بندی ها :</span>
				</div>
				<div>
					<ul className={`flex flex-wrap gap-4 `}>
						{journalsSubCategories.map(({ id, title, color }) => (
							<Filter
								key={`/journals|journalsCategoryFilter-${id}`}
								categoryId={id}
								title={title}
								color={color}
								active={activeCategoryId === id}
								onClick={() => handleSetActiveCategoryId(id)}
							/>
						))}
					</ul>
				</div>
			</div>

			{/* ——— <Journals List> ——— */}
			<div>
				<>
					{/* When Journals are in 'Fetching' Status */}
					{journals.isFetching && (
						<ul
							className="grid gap-4"
							style={{ gridTemplateColumns: "repeat(auto-fill, minmax(1px, 300px))" }}
						>
							<JournalSkeleton />
							<JournalSkeleton />
							<JournalSkeleton />
						</ul>
					)}

					{/* When Journals are fetched, but there is no journal available */}
					{!journals.isFetching && journals.data.posts.length === 0 && (
						<div className="text-center">
							<span> {activeCategoryId == false ? "ژورنال ها" : "ژورنالی وجود ندارد!"}</span>
						</div>
					)}

					{/* When Journals are fetched, and there is journals available */}
					{!journals.isFetching && journals.data.posts.length > 0 && (
						<ul
							className="grid gap-4"
							style={{ gridTemplateColumns: "repeat(auto-fill, minmax(1px, 300px))" }}
						>
							{journals.data.posts.map(({ id, img, name, slug = "" }) => (
								<Journal
									key={`/journals|category-${
										activeCategoryId ? activeCategoryId : "All"
									}|journal-${id}`}
									url={`/article/${id}/${slug}`}
									image={img}
									title={name}
								/>
							))}
						</ul>
					)}
				</>
			</div>
		</MainContainer>
	);
};
export default Journals;
