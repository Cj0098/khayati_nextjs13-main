import { useState } from "react";
import Link from "components/common/Link/Link";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Libraries
import axios from "axios";
import { v4 as uuid } from "uuid";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { GridLoader } from "react-spinners";

// Hooks
import useDebounce from "../../../hooks/useDebounce";

// Icons
import { BiSearch } from "react-icons/bi";

// CSS
import style from "./HeaderSearch.module.scss";

const Category = ({ title = "" }) => (
	<div className="mb-2 text-sm font-medium text-black">{title}</div>
);

const NotFound = () => <span className="text-sm text-gray-500">نتیجه‌ای یافت نشد.</span>;

const Item = ({ url = "/", image = "", name = "" }) => (
	<Link href={url} className="flex items-center gap-2 mb-2 py-1 hover:bg-[#f1f1f1]">
		<div className="w-16 overflow-hidden">
			<LazyLoadImage src={image} alt={name} className="w-full" />
		</div>
		<div>
			<span className="text-sm">{name}</span>
		</div>
	</Link>
);

const HeaderSearch = (props) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [searchIsFetching, setSearchIsFetching] = useState(false);
	const [searchDropdown, setSearchDropdown] = useState(false);
	const handleSearchOnChange = async () => {
		if (searchQuery.length > 0) {
			setSearchIsFetching(true);
			try {
				const { data } = await axios.get(`/search/${searchQuery}`);

				setSearchResults(data.data);
			} catch (e) {
				toast.error("خطایی رخ داد");
			}
			setSearchIsFetching(false);
		} else {
			setSearchResults([]);
		}
	};
	useDebounce(handleSearchOnChange, 1000, [searchQuery]);

	// Datas
	let Courses = [];
	let Books = [];
	let Posts = [];
	if (searchResults.courses) Courses = searchResults.courses;
	if (searchResults.books) Books = searchResults.books;
	if (searchResults.posts) Posts = searchResults.posts;

	return (
		<div
			className={`relative flex-1 ${style.headerSearchWrapper}`}
			style={{ minWidth: "100px" }}
		>
			<div
				className={`flex items-center gap-2 px-2 rounded-xl focus-within:bg-[#4a48d21a] duration-200 shadow-bsSecondaryInset ${style.headerSearchBox}`}
			>
				<div className="flex-1">
					<input
						type="text"
						placeholder="جستجو"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onFocus={() => setSearchDropdown(true)}
						onBlur={() => setTimeout(() => setSearchDropdown(false), 500)}
						className="w-full pr-1 text-sm bg-transparent outline-none sm:text-base"
					/>
				</div>
				<div className="flex-center">
					<button className="duration-200 hover:text-primary">
						<i className="text-xl">
							<BiSearch />
						</i>
					</button>
				</div>
			</div>

			{/* Search Dropdown */}
			{searchDropdown && searchQuery.length > 0 && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className={`bg-white rounded-xl p-2 overflow-auto ${style.headerSearchDropdown}`}
				>
					{searchIsFetching ? (
						<div className="h-full opacity-40 flex-center">
							<GridLoader size={12} color="#4B48D2" />
						</div>
					) : (
						<div>
							{/* Courses */}
							<div className="mb-4">
								<Category title="دوره ها" />
								<div>
									{Courses.length > 0 ? (
										Courses.map(({ id, img = "", name = "", slug = "" }) => (
											<Item
												key={uuid()}
												url={`/course/${id}/${slug}`}
												image={img}
												name={name}
											/>
										))
									) : (
										<NotFound />
									)}
								</div>
							</div>

							{/* Books */}
							<div className="mb-4">
								<Category title="کتاب ها" />
								<div>
									{Books.length > 0 ? (
										Books.map(({ id, img, name }) => (
											<Item
												key={uuid()}
												url={`/book/${id}`}
												image={img}
												name={name}
											/>
										))
									) : (
										<NotFound />
									)}
								</div>
							</div>

							{/* Posts */}
							<div>
								<Category title="پست ها" />
								<div>
									{Posts.length > 0 ? (
										Posts.map(({}) => <Item key={uuid()} />)
									) : (
										<NotFound />
									)}
								</div>
							</div>
						</div>
					)}
				</motion.div>
			)}
		</div>
	);
};

export default HeaderSearch;
