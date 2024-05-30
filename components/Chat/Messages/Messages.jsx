// Hooks
import useViewportWidth from "hooks/useViewportWidth";
import useUserQuery from "hooks/useUserQuery";
import { useEffect, useState } from "react";
// Libraries
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import InfiniteScroll from "react-infinite-scroll-component";
// Components
import Skeleton from "components/common/Skeleton/Skeleton";
import MessageInput from "components/Chat/Messages/MessageInput/MessageInput";

// Icons
import { BsFillTrashFill } from "react-icons/bs";

// CSS
import style from "./Messages.module.scss";

const Message = ({
	role,
	avatar,
	name,
	text,
	isMe,
	viewportWidth,
	handleDeleteMessage = () => {},
}) => {
	return (
		<div className={`mb-1 flex ${isMe ? "justify-start" : "justify-end"}`}>
			<div
				className={`rounded-xl px-2 relative
				${isMe ? "bg-[#C5F9F0]" : "bg-white"}
				${isMe ? "rounded-tr-none" : "rounded-tl-none"}
				`}
			>
				{/* If user was admin then give access to delete messages from chat */}
				{role === "admin" && (
					<button
						className={`absolute top-2/4 text-red-500
							${viewportWidth >= 1024 ? "opacity-50 hover:opacity-100" : ""}
							${isMe ? style.PlaceDeleteMessageOnLeft : style.PlaceDeleteMessageOnRight}`}
						style={{ transform: "translateY(-50%)" }}
						onClick={handleDeleteMessage}
					>
						<BsFillTrashFill />
					</button>
				)}

				<div className="flex items-center gap-2 mb-2">
					<div>
						<LazyLoadImage src={avatar} alt="آواتار" className="w-4 h-4 rounded-full" />
					</div>
					<div>
						<span className="text-sm">{name}</span>
					</div>
				</div>
				<div>
					<p className="font-medium">{text}</p>
				</div>
			</div>
		</div>
	);
};

const MessageSkeleton = ({ isMe }) => {
	return (
		<div className={`flex ${isMe ? "justify-start" : "justify-end"}`}>
			<div
				dir={`${isMe ? "rtl" : "ltr"}`}
				className="flex flex-col gap-2 p-2 bg-gray-400/5 w-[200px] rounded"
			>
				<Skeleton width="100%" height="8px" borderRadius="4px" />
				<Skeleton width="100%" height="8px" borderRadius="4px" />
				<Skeleton width="100%" height="8px" borderRadius="4px" />
				<Skeleton width="60%" height="8px" borderRadius="4px" />
			</div>
		</div>
	);
};

const Messages = ({ loggedInUserToken, chatId }) => {
	const user = useUserQuery();
	const { viewportWidth } = useViewportWidth();
	const [messages, setMessages] = useState({ data: [] });
	const [page, setPage] = useState(20);
	const [isLoading, setIsLoading] = useState(true);
	const [hasMore, setHasMore] = useState(false);

	// ——— Fetch Group Messages
	const fetchMessages = (token, chatId, page) =>
		axios
			.get(
				`/v2/chats/mess	ages/${chatId}/${page}`,

				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			)
			.then(function (response) {
				if (messages.data.length == response.message) setHasMore(false);
				else setHasMore(true);
				console.log(hasMore, messages.data.length, response.message);
				setMessages(response.data);
			});
	// const messages = useQuery(
	// 	["Chat", "Messages", `Group-${chatId}`],
	// 	() => fetchMessages(loggedInUserToken, chatId),
	// 	{
	// 		retry: true,
	// 		refetchInterval: 1000,
	// 	}
	// );

	useEffect(() => {
		console.log("page", page);

		setIsLoading(true);
		fetchMessages(loggedInUserToken, chatId, page);
		setIsLoading(false);
	}, [loggedInUserToken, chatId, page, fetchMessages]);
	// ——— Delete Message

	const handleDeleteMessage = async (messageId) => {
		try {
			const { data: deleteMessageApiResponse } = await axios.get(
				`/chats/message/delete/${messageId}`,
				{
					headers: {
						authorization: `Bearer ${loggedInUserToken}`,
					},
				}
			);
		} catch (e) {
			toast.error("خطا ارتباط با سرور");
		}
	};
	const fetchMoreData = () => {
		setPage(page + 10);
		console.log("page", page, messages.data.length);
	};

	return (
		<div className="flex flex-col h-[500px]">
			{/* <Chat Texts> */}
			<div className="flex-1 px-4 py-3 overflow-auto">
				<div className="flex flex-col gap-4">
					{isLoading && (
						<>
							<MessageSkeleton />
							<MessageSkeleton isMe />
							<MessageSkeleton />
							<MessageSkeleton isMe />
						</>
					)}
					{/* 
					{!messages.isLoading &&
						messages.data.map((message) => (
							<Message
								key={`/chat|chat-${message.chat_id}|message-${message.id}`}
								role={!user.isLoading ? user.data.role : "member"}
								avatar={message.user?.avatar || "/images/user.png"}
								name={message.user?.name}
								text={message.body}
								isMe={message.isMe}
								viewportWidth={viewportWidth}
								handleDeleteMessage={() => handleDeleteMessage(message.id)}
							/>
						))} */}
					{!isLoading ? (
						<div
							id="scrollableDiv"
							style={{
								height: 420,
								overflow: "auto",
								display: "flex",
								flexDirection: "column-reverse",
							}}
						>
							{/*Put the scroll bar always on the bottom*/}
							<InfiniteScroll
								dataLength={messages.data.length}
								next={fetchMoreData}
								style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
								inverse={true} //
								hasMore={hasMore}
								endMessage={
									<p style={{ textAlign: "center" }}>
										<b>اتمام پیام ها</b>
									</p>
								}
								loader={
									<div
										role="status "
										className="flex mx-auto place-items-center items-center"
									>
										<svg
											aria-hidden="true"
											className="text-center w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
											viewBox="0 0 100 101"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
												fill="currentColor"
											/>
											<path
												d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
												fill="currentFill"
											/>
										</svg>
										<span className="sr-only text-center">درحال بارگزاری</span>
									</div>
								}
								scrollableTarget="scrollableDiv"
							>
								{messages.data.map((message, index) => (
									<Message
										key={`/chat|chat-${message.chat_id}|message-${message.id}`}
										role={!user.isLoading ? user.data.role : "member"}
										avatar={message.user?.avatar || "/images/user.png"}
										name={message.user?.name}
										text={message.body}
										isMe={message.isMe}
										viewportWidth={viewportWidth}
										handleDeleteMessage={() => handleDeleteMessage(message.id)}
									/>
								))}
							</InfiniteScroll>
						</div>
					) : (
						""
					)}
				</div>
			</div>
			{/* </Chat Texts> */}

			{/* <Send Message Form> */}
			<MessageInput loggedInUserToken={loggedInUserToken} chatId={chatId} />
			{/* </Send Message Form> */}
		</div>
	);
};

export default Messages;
