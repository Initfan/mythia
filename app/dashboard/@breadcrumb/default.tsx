"use client";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { Fragment, useEffect, useState } from "react";

const DefaultPage = () => {
	const [items, setItems] = useState<string[]>();

	useEffect(() => {
		const pathItem = window.location.pathname.split("/").slice(1);
		setItems(pathItem);
	}, []);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{items?.map((v, i) => (
					<Fragment key={v}>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">{v}</BreadcrumbLink>
						</BreadcrumbItem>
						{items.length != i + 1 && <BreadcrumbSeparator />}
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default DefaultPage;
