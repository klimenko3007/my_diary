import React from "react";
import Loader from "react-loader-spinner";

const LoaderComponent = () => {
	return (
		<div className="loader">
			<Loader type="Oval" color="#fff" height={100} width={100} />
		</div>
	);
};

export default LoaderComponent;
