import Head from "next/head";

// Components
import Courses from "components/Courses/Courses";

export default function FreeCourses() {
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;

	return (
		<>
			<Head>
				<title>{`کلاس های رایگان — ${appTitle}`}</title>
			</Head>

			<Courses coursesType="free" />
		</>
	);
}
