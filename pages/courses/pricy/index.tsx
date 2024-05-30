import Head from "next/head";

// Components
import Courses from "components/Courses/Courses";

export default function Classes() {
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;

	return (
		<>
			<Head>
				<title>{`کلاس های ویژه — ${appTitle}`}</title>
			</Head>

			<Courses coursesType="pricy" />
		</>
	);
}
