import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import Container from "./components/Container";
import user from "./reducers/user";

const reducer = combineReducers({
	user: user.reducer,
});
const store = configureStore({ reducer });

const App = () => {
	return (
		<Provider store={store}>
			<Container />
		</Provider>
	);
};

export default App;
