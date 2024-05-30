import React from "react";

// Components
import Course from "components/Course/Course";

// Types
import { GetServerSideProps } from "next";
type ServerSideProps = {
	courseId: string;
};

export default function Cours(props: ServerSideProps) {
	return <Course courseId={Number(props.courseId)} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	if (query.courseParams === undefined) {
		return {
			redirect: {
				destination: "/courses",
				permanent: false,
			},
		};
	}

	const courseId = query.courseParams[0];

	return {
		props: {
			courseId: courseId,
		},
	};
};
