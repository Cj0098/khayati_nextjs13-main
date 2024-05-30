// Libraries
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Components
import CategorySkeleton from "./CategorySkeleton/CategorySkeleton";
import Category from "./Category/Category";

// Types
type ProductCategory = {
	id: number;
	img: string;
	name: string;
	slug: string;
};

const ProductCategories = () => {
	const fetchProducts = () => axios.post("/products/cats/list").then((res) => res.data.data);
	const productCategories = useQuery<ProductCategory[]>(["Products-Categories"], fetchProducts, {
		retry: true,
	});

	console.log(productCategories.data);

	return (
		<main className="py-12 sm:py-16 ">
			<div className="container">
				{productCategories.data === undefined ? (
					<div
						className="grid gap-4"
						style={{ gridTemplateColumns: "repeat(auto-fit, minmax(1px, 300px))" }}
					>
						<CategorySkeleton />
						<CategorySkeleton />
						<CategorySkeleton />
					</div>
				) : (
					<>
						<div className="mb-4">
							<span>دسته بندی محصولات :</span>
						</div>
						<div
							className="grid items-center m-auto gap-4"
							style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
						>
							{productCategories.data.map((category) => (
								<Category
									key={`/products|category-${category.id}`}
									url={`/products/${category.id}/${category.slug}`}
									image={category.img}
									name={category.name}
								/>
							))}
						</div>
					</>
				)}
			</div>
		</main>
	);
};

export default ProductCategories;
