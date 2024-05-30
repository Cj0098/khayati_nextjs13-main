// Libraries
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Components
import ProductSkeleton from "./ProductSkeleton/ProductSkeleton";
import Product from "./Product/Product";

// Types
type ProductT = {
	id: number;
	img: string;
	name: string;
	price: string;
	slug: string;
};
type Props = {
	categoryId: string;
};

const ProductsByCategory = (props: Props) => {
	const { categoryId } = props;
	const fetchProductCategories = (categoryId: number) =>
		axios.get(`/products/cat/${categoryId}`).then((res) => res.data.data);
	const productsByCategory = useQuery<ProductT[]>(["Products", categoryId], () =>
		fetchProductCategories(Number(categoryId))
	);

	console.log(productsByCategory.data);

	return (
		<main className="py-12 sm:py-16">
			<div className="container">
				{productsByCategory.data === undefined ? (
					<div
						className="grid gap-4"
						style={{ gridTemplateColumns: "repeat(auto-fit, minmax(1px, 300px))" }}
					>
						<ProductSkeleton />
						<ProductSkeleton />
						<ProductSkeleton />
						<ProductSkeleton />
					</div>
				) : (
					<>
						{/* If there was no product for that specefic category */}
						{productsByCategory.data.length === 0 ? (
							<div className="text-center">
								<span>محصولی برای این دسته بندی یافت نشد!</span>
							</div>
						) : (
							<div
								className="grid gap-4"
								style={{
									gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
								}}
							>
								{productsByCategory.data.map((product) => (
									<Product
										key={`/products/${categoryId}|Product-${product.id}`}
										url={`/product/${product.id}/${product.slug}`}
										image={product.img}
										title={product.name}
										price={Number(product.price)}
									/>
								))}
							</div>
						)}
					</>
				)}
			</div>
		</main>
	);
};

export default ProductsByCategory;
