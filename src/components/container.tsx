import React from "react";

interface props {
	children: React.ReactNode;
}

const Container = ({ children }: props) => {
	return <main className="w-[90vw] mx-auto">{children}</main>;
};

export default Container;
