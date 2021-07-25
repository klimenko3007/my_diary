import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchUsers } from "../reducers/user";
import UserThumb from "./UserThumb";
import LoaderComponent from "./LoaderComponent";

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
		<>
			{loader ? (
				<LoaderComponent />
			) : (
				<div
					onScroll={() => onScroll()}
					ref={listDiv}
					className="container"
				>
					<h1 className="heading">Our users</h1>
					<div className="cards-container">
						{users.map((item) => (
							<UserThumb item={item} key={item.id} />
						))}
					</div>
					{showText && (
						<p className="message">There are no more users to load</p>
					)}
				</div>
			)}
		</>
	);
};

export default UserList;
