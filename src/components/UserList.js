import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BottomScrollListener } from "react-bottom-scroll-listener";

import { fetchUsers } from "../reducers/user";
import UserThumb from "./UserThumb";
import LoaderComponent from "./LoaderComponent";

const UserList = () => {
	const [page, setPage] = useState(5);
	const [showText, setShowText] = useState(false);
	const dispatch = useDispatch();
	const users = useSelector(store => store.user.items);
	const loader = useSelector(store => store.user.loader);
	const pages = useSelector(store => store.user.totalPages);
	const error = useSelector(store => store.user.error);

	useEffect(() => {
		dispatch(fetchUsers(page));
	}, [page]);

	const onBottomFetch = () => {
		if (pages > 1) {
			setPage(page + 5);
		} else setShowText(true);
	};

	return (
		<section className="page">
			<BottomScrollListener onBottom={onBottomFetch} />
			<h1 className="heading">Our users</h1>
			<div className="container">
				<div className="cards-container">
					{users.map(item => (
						<UserThumb item={item} key={item.id} />
					))}
				</div>
				{loader && <LoaderComponent />}
				{showText && (
					<p className="message">There are no more users to load!</p>
				)}
				{error && <p className="message">{error.message}</p>}
			</div>
		</section>
	);
};

export default UserList;
