// Libraries
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Components
import MainContainer from "components/common/MainContainer/MainContainer";
import Skeleton from "components/common/Skeleton/Skeleton";
import Category from "./Category/Category";

// Types
type ArticleCategory = {
	id: number;
	name: string;
	slug: string;
};

const Articles = () => {
	const fetchArticleCategories = () => axios.get("/posts/cats/list").then((res) => res.data.data);
	const articleCategories = useQuery<ArticleCategory[]>(
		["Article-Categories"],
		fetchArticleCategories,
		{
			retry: true,
		}
	);

	return (
		<MainContainer>
			{articleCategories.data === undefined ? (
				<div
					className="grid gap-4"
					style={{ gridTemplateColumns: "repeat(auto-fill, minmax(1px, 300px))" }}
				>
					<Skeleton aspectRatio="1 / 1" />
					<Skeleton aspectRatio="1 / 1" />
					<Skeleton aspectRatio="1 / 1" />
				</div>
			) : (
				<>
					<div className="mb-4">
						<span>دسته بندی مقالات :</span>
					</div>
					<div
						className="grid gap-4"
						style={{ gridTemplateColumns: "repeat(auto-fill, minmax(1px, 300px))" }}
					>
						{articleCategories.data.map((category) => {
							return (
								<Category
									key={`/articles|Category-${category.id}`}
									url={`/articles/${category.id}/${category.slug}`}
									title={category.name}
								/>
							);
						})}
					</div>
				</>
			)}
		</MainContainer>
	);
};
export default Articles;
