"use client";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const DefaultPage = () => {
	const pathname = usePathname();
	const [items, setItems] = useState<string[]>();

	useEffect(() => {
		const pathItem = pathname.split("/").slice(1);
		setItems(pathItem);
	}, [pathname]);

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
