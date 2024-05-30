import Head from "next/head";

// Utils
import formatNumber from "utils/formatNumber";

// Libraries
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useQuery } from "@tanstack/react-query";

// Components
import Profile from "components/Profile/Profile";
import Loading from "components/Profile/Loading/Loading";

const Order = ({ orderNumber, productName, orderDate, price, orderStatus }) => (
	<tr className="text-center">
		<td className="py-2">{orderNumber}</td>
		<td>{productName}</td>
		<td dir="ltr">{`${orderDate[0]}/${orderDate[1]}/${orderDate[2]}`}</td>
		<td>{formatNumber(price)}</td>
		<td>{orderStatus}</td>
	</tr>
);

export default function ProfileOrders(props) {
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;

	const fetchOrders = (token) =>
		axios
			.post(
				`/orders/shop`,
				{},
				{
					headers: { authorization: `Bearer ${token}` },
				}
			)
			.then((res) => res.data.data);
	const orders = useQuery(
		["Profile", "Orders", "Shop"],
		() => fetchOrders(props.loggedInUserToken),
		{
			retry: true,
			staleTime: 10 * 1000,
		}
	);

	return (
		<>
			<Head>
				<title>{`سفارشات من — ${appTitle}`}</title>
			</Head>

			<Profile>
				{orders.isLoading && <Loading />}

				{!orders.isLoading && (
					<div
						className="w-full p-2 mx-auto shadow-lg bg-background rounded-2xl flex-center"
						style={{ maxWidth: "700px" }}
					>
						<table className="w-full">
							<thead style={{ borderBottom: "1px solid gray" }}>
								<tr>
									<th className="py-2">شماره سفارش</th>
									<th>نام محصول</th>
									<th>تاریخ سفارش</th>
									<th>قیمت</th>
									<th>وضعیت سفارش</th>
								</tr>
							</thead>
							<tbody>
								{orders.data.map(({ id, collection, date, status }) => (
									<Order
										key={uuid()}
										orderNumber={id}
										productName={collection.name}
										orderDate={date}
										price={collection.price}
										orderStatus={status}
									/>
								))}
							</tbody>
						</table>
					</div>
				)}
			</Profile>
		</>
	);
}

export async function getServerSideProps({ req }) {
	const { cookies } = req;

	// If user was not logged in : redirect to homepage
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
