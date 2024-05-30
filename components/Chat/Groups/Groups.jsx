// Components
import Skeleton from "components/common/Skeleton/Skeleton";

// Libraries
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Icons
import { HiUserGroup } from "react-icons/hi";

const GroupSkeleton = () => {
	return (
		<li className="p-2">
			<div className="grid items-center gap-2" style={{ gridTemplateColumns: "min-content minmax(1px, 1fr)" }}>
				<div>
					<Skeleton width="40px" height="40px" borderRadius="100%" />
				</div>
				<div>
					<Skeleton width="100%" height="16px" borderRadius="4px" />
				</div>
			</div>
		</li>
	);
};

const Group = ({ name = "", active = false, onClick = () => {} }) => {
	return (
		<li
			className={`grid items-center gap-2 p-2 cursor-pointer ${active ? "bg-[#C5F9F0]" : "hover:bg-[#c8c8c8]"}  `}
			style={{ gridTemplateColumns: "min-content 1fr" }}
			onClick={onClick}
		>
			<div className="w-10 h-10 overflow-hidden rounded-full bg-[#f1f1f1] flex-center">
				<i className="text-xl">
					<HiUserGroup />
				</i>
			</div>
			<div>
				<span className="">{name}</span>
			</div>
		</li>
	);
};

const Groups = ({ loggedInUserToken, chatId, setChatId }) => {
	// ——— Fetch Group List
	const fetchGroups = (token) =>
		axios
			.get("/chats", {
				headers: {
					authorization: `Bearer ${token}`,
				},
			})
			.then((res) => res.data.data);
	const groups = useQuery(["Chat", "Groups"], () => fetchGroups(loggedInUserToken), {
		retry: true,
		staleTime: 20 * 1000,
	});

	return (
		<div>
			<ul className="h-full border-l border-l-black/20">
				{groups.isLoading && (
					<>
						<GroupSkeleton />
						<GroupSkeleton />
						<GroupSkeleton />
					</>
				)}
				{!groups.isLoading &&
					groups.data.map((group) => (
						<Group
							key={`/chats|group-${group.id}`}
							name={group.data.name}
							active={group.id === chatId}
							onClick={() => setChatId(group.id)}
						/>
					))}
			</ul>
		</div>
	);
};

export default Groups;
