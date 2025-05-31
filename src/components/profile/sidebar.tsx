"use client";
import { logout } from "@/actions/user-action";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Book, LayoutDashboard, LogOut, Settings, Wallet } from "lucide-react";
// import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const items = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		title: "Novel",
		url: "/dashboard/novel",
		icon: Book,
	},
	{
		title: "Pendapatan",
		url: "#",
		icon: Wallet,
	},
];

const action = [
	{
		title: "Setting",
		url: "#",
		icon: Settings,
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const [currentPath, setCurrentPath] = useState("");

	useEffect(() => setCurrentPath(window.location.pathname.split("/")[2]), []);
	console.log(currentPath);

	// const logout = async () => {
	// 	const req = await fetch("/api/auth/logout");
	// 	if (req.ok) return redirect("/");
	// };

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Dashboard</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a
											href={item.url}
											className={
												item.title.toLocaleLowerCase() ==
												currentPath
													? "text-muted-foreground"
													: ""
											}
										>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Action</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{action.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a
											href={item.url}
											className={
												item.title.toLocaleLowerCase() ==
												currentPath
													? "text-muted-foreground"
													: ""
											}
										>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<button onClick={logout}>
										<LogOut />
										<span>Logout</span>
									</button>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
