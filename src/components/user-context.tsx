"use client";
import { user } from "@/generated/prisma";
import { createContext, ReactNode } from "react";

export const userContext = createContext<user | null>(null);

import React from "react";

const UserContext = ({
	children,
	user,
}: {
	children: ReactNode;
	user: user;
}) => {
	return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

export default UserContext;
