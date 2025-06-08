import React from "react";

const layout = async ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return <main className="mx-auto w-3/4 space-y-6 pb-10">{children}</main>;
};

export default layout;
