import React from "react";

// Libraries
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Context
import { useContext } from "react";
import TokenContext from "context/token/TokenContext";

// Types
type CourseComment = {
	id: number;
	text: string;
	user: {
		name: string;
		avatar: string | null;
	};
};
export type CourseVideo = {
	content: string;
	id: number;
	demo: string;
	name: string;
	url: string;
};
type CourseSection = {
	id: number;
	name: string;
	videos: CourseVideo[];
};
export type CourseT = {
	id: number;
	comments: CourseComment[];
	description: string;
	img: string;
	isBookmarked: boolean;
	isBought: boolean;
	isJustified: boolean;
	name: string;
	price: string;
	reviews: number;
	reviewsRating: number;
	sections: CourseSection[];
	slug: string;
	totalVideos: number;
	type: "pricy" | "free";
	videos: CourseVideo[];
};

const useCourseQuery = (courseId: number) => {
	const { token: loggedInUserToken } = useContext(TokenContext);

	const fetchCourse = (courseId: number, loggedInUserToken: string | false) => {
		if (loggedInUserToken === false) {
			return axios.get(`/courses/single/${courseId}`).then((res) => res.data.data);
		} else {
			return axios
				.get(`/courses/single/${courseId}`, {
					headers: { authorization: `Bearer ${loggedInUserToken}` },
				})
				.then((res) => res.data.data);
		}
	};
	const course = useQuery<CourseT>(
		["Course", courseId],
		() => fetchCourse(courseId, loggedInUserToken),
		{
			retry: true,
		}
	);

	return course;
};

export default useCourseQuery;
