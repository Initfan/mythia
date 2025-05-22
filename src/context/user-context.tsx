"use client";
import { Prisma } from "@/generated/prisma";
import { createContext, ReactNode } from "react";

type userAuthor = Prisma.userGetPayload<{ include: { author: true } }>;

export const userContext = createContext<userAuthor | null>(null);

import React from "react";

const UserContext = ({
	children,
	user,
}: {
	children: ReactNode;
	user: userAuthor;
}) => {
	return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

export default UserContext;
