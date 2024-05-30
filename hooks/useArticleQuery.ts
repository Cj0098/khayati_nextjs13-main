import React from "react";

// Libraries
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Context
import { useContext } from "react";
import TokenContext from "context/token/TokenContext";

// Types
type ArticleComment = {
	id: number;
	text: string;
	user: {
		id: number;
		name: string;
		avatar: string | null;
	};
};
type ArticleGalleryItem = {
	id: number;
	img: string;
	post_id: number;
};
type ArticleTag = {
	id: number;
	name: string;
	slug: string;
	type: string;
};
type Article = {
	comments: ArticleComment[];
	content: string;
	gallery: ArticleGalleryItem[];
	id: number;
	img: string;
	isBookmarked: boolean;
	name: string;
	reviews: number;
	reviewsRating: number;
	slug: string;
	tag: ArticleTag[];
};

const useArticleQuery = (articleId: number) => {
	const { token: loggedInUserToken } = useContext(TokenContext);

	const fetchArticle = (articleId: number, loggedInUserToken: string | false) => {
		if (loggedInUserToken === false) {
			return axios.get(`/posts/single/${articleId}`).then((res) => res.data.data);
		} else {
			return axios
				.get(`/posts/single/${articleId}`, {
					headers: {
						authorization: `Bearer ${loggedInUserToken}`,
					},
				})
				.then((res) => res.data.data);
		}
	};
	const article = useQuery<Article>(
		["Article", articleId.toString()],
		() => fetchArticle(articleId, loggedInUserToken),
		{ retry: true }
	);

	return article;
};

export default useArticleQuery;
