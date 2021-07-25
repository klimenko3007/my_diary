import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchUsers } from "../reducers/user";

const UserList = () => {
	const [page, setPage] = useState(5);
	const [showText, setShowText] = useState(false);
	const listDiv = useRef();
	const dispatch = useDispatch();
	const users = useSelector((store) => store.user.items);
	const loader = useSelector((store) => store.user.loader);
	const pages = useSelector((store) => store.user.totalPages);

	useEffect(() => {
		dispatch(fetchUsers(page));
	}, [dispatch, page]);

	const onScroll = () => {
		if (listDiv.current) {
			if (
				listDiv.current.scrollHeight - listDiv.current.scrollTop ===
				listDiv.current.clientHeight
			) {
				if (pages > 1) {
					setPage(page + 5);
				} else setShowText(true);
			}
		}
	};

	return (
		<div
			onScroll={() => onScroll()}
			ref={listDiv}
			style={{ overflowY: "scroll", height: "100vh", border: "1px solid blue" }}
		>
			{loader && <p>Loading ...</p>}
			{users.map((item) => {
				return (
					<div key={item.id}>
						<p>{item.email}</p>
						<p>{item.first_name}</p>
						<p>{item.last_name}</p>
						<img
							src={item.avatar}
							alt={`${item.first_name} ${item.first_name}`}
						/>
					</div>
				);
			})}
		{showText && <p>There are no more users to load</p>}
		</div>
	);
};

export default UserList;
