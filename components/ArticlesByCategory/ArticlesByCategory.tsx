import Head from "next/head";

// Libraries
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Components
import CourseSkeleton from "components/Courses/CourseSkeleton/CourseSkeleton";
import MainContainer from "components/common/MainContainer/MainContainer";
import Article from "./Article/Article";

// Types
type Category = {
	id: number;
	name: string;
	slug: string;
};
type ArticleT = {
	content: string;
	id: number;
	img: string;
	name: string;
	slug: string;
	reviews: number;
	reviewsRating: number;
};
type ArticlesByCategory = {
	cat: Category;
	posts: ArticleT[];
};
type Props = {
	categoryId: number;
};

const ArticlesByCategory = (props: Props) => {
	const { categoryId } = props;
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;

	const fetchArticlesByCategory = () =>
		axios.get(`/posts/cat/${categoryId}`).then((res) => res.data.data);
	const articlesByCategory = useQuery<ArticlesByCategory>(
		["ArticlesByCategory", categoryId.toString()],
		fetchArticlesByCategory,
		{ retry: true }
	);

	console.log(articlesByCategory.data);

	return (
		<>
			<Head>
				<title>{`${
					articlesByCategory.data === undefined
						? "مقالات"
						: articlesByCategory.data.cat.name
				} — ${appTitle}`}</title>
			</Head>

			<MainContainer>
				{articlesByCategory.data === undefined ? (
					<div
						className="grid gap-8"
						style={{
							gridTemplateColumns: "repeat(auto-fill, minmax(1px, 300px))",
						}}
					>
						<CourseSkeleton />
						<CourseSkeleton />
						<CourseSkeleton />
					</div>
				) : (
					<>
						{articlesByCategory.data.posts.length === 0 ? (
							<div className="text-center">
								<span>مقاله‌ای در این دسته‌بندی یافت نشد !</span>
							</div>
						) : (
							<div
								className="grid gap-8 justify-center"
								style={{
									gridTemplateColumns: "repeat(auto-fill, minmax(1px, 300px))",
								}}
							>
								{articlesByCategory.data.posts.map((article) => (
									<Article
										key={`/articles/${categoryId}|Article-${article.id}`}
										url={`/article/${article.id}/${article.slug}`}
										image={article.img}
										title={article.name}
										rateScore={article.reviewsRating}
										rateCount={article.reviews}
									/>
								))}
							</div>
						)}
					</>
				)}
			</MainContainer>
		</>
	);
};

export default ArticlesByCategory;
