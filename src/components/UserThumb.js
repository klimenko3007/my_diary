import React from "react";

const UserThumb = ({ item }) => {
	return (
		<div className="card">
			<img
				src={item.avatar}
				alt={`${item.first_name} ${item.first_name}`}
				className="avatar"
			/>
			<p className="name">
				{item.first_name} {item.last_name}
			</p>
			<p className="email">{item.email}</p>
		</div>
	);
};

export default UserThumb;
