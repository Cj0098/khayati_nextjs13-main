import Head from "next/head";

// Hooks
import useUserQuery from "hooks/useUserQuery";

// Libraries
import { LazyLoadImage } from "react-lazy-load-image-component";

// Components
import Profile from "components/Profile/Profile";
import Loading from "components/Profile/Loading/Loading";
import Avatar from "components/Profile/Edit/Avatar/Avatar";
import MobileNumber from "components/Profile/Edit/MobileNumber/MobileNumber";
import FullName from "components/Profile/Edit/FullName/FullName";
import Gender from "components/Profile/Edit/Gender/Gender";
import Birthdate from "components/Profile/Edit/Birthdate/Birthdate";
import City from "components/Profile/Edit/City/City";
import Address from "components/Profile/Edit/Address/Address";
import PostalCode from "components/Profile/Edit/PostalCode/PostalCode";

export default function ProfileEdit(props) {
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;

	const user = useUserQuery();

	return (
		<>
			<Head>
				<title>{`ویرایش پروفایل — ${appTitle}`}</title>
			</Head>

			<Profile>
				{user.isLoading && <Loading />}

				{!user.isLoading && (
					<div
						className="w-full p-4 mx-auto shadow-lg bg-background rounded-2xl flex-center"
						style={{ maxWidth: "700px" }}
					>
						<div className="w-full" style={{ maxWidth: "500px" }}>
							<div>
								<div className="mb-12">
									<Avatar
										loggedInUserToken={props.loggedInUserToken}
										avatar={user.data.avatar}
									/>
								</div>
								<div className="flex flex-col gap-4">
									<MobileNumber mobileNumber={user.data.phone} />
									<FullName
										loggedInUserToken={props.loggedInUserToken}
										fullName={user.data.name}
									/>
									<Gender
										loggedInUserToken={props.loggedInUserToken}
										gender={user.data.gender}
									/>
									<Birthdate
										loggedInUserToken={props.loggedInUserToken}
										birthdate={user.data.birthday}
									/>
									<City
										loggedInUserToken={props.loggedInUserToken}
										city={user.data.city}
									/>
									<Address
										loggedInUserToken={props.loggedInUserToken}
										address={user.data.address}
									/>
									<PostalCode
										loggedInUserToken={props.loggedInUserToken}
										postalCode={user.data.postal_code}
									/>
								</div>
							</div>
						</div>
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
