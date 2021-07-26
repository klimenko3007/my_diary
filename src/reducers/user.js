import { createSlice } from "@reduxjs/toolkit";
import { batch } from "react-redux";

import { BASIC_URL } from "../reusables/urls";

const initialState = {
	items: [],
	totalPages: null,
	error: null,
	loader: false,
};

const user = createSlice({
	name: "user",
	initialState,
	reducers: {
		setItems: (store, action) => {
			store.items = action.payload;
		},
		setTotalPages: (store, actions) => {
			store.totalPages = actions.payload;
		},
		setError: (store, action) => {
			store.error = action.payload;
		},
		setLoader: (store, action) => {
			store.loader = action.payload;
		},
	},
});

export default user;

export const fetchUsers = (page) => {
	return (dispatch) => {
		dispatch(user.actions.setLoader(true));
		fetch(BASIC_URL(page))
			.then((res) => res.json())
			.then((data) => {
				setTimeout(() => dispatch(user.actions.setLoader(false)), 3000);
				setTimeout(() => {
					batch(() => {
						dispatch(user.actions.setError(null));
						dispatch(user.actions.setItems(data.data));
						dispatch(user.actions.setTotalPages(data.total_pages));
					});
				}, 3000);
			})
			.catch((error) => {
				dispatch(user.actions.setError({ message: error.message }));
				dispatch(user.actions.setLoader(false));
			});
	};
};
