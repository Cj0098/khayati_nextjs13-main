/*
    @desc: a hook that makes article comment accessible between components.
*/

// Libraries
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";

const useArticleCommentsQuery = (articleId) => {
	const fetchArticleComments = (articleId) =>
		axios.get(`/posts/single/${articleId}`).then((res) => res.data.data.comments);

	const articleComments = useQuery(
		["Article", _.toString(articleId), "Comments"],
		() => fetchArticleComments(articleId),
		{
			retry: true,
			staleTime: Infinity,
		}
	);

	return articleComments;
};

export default useArticleCommentsQuery;
