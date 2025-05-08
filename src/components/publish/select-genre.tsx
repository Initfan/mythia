"use client";
import React, { useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CheckCheck } from "lucide-react";
import { Button } from "../ui/button";

const GENRES = [
	"fantasy",
	"romance",
	"thriller",
	"comedy",
	"science fiction",
	"historical",
];

const SelectGenre = () => {
	const [genre, setGenre] = useState<string[]>([]);

	const selectHandler = (selectedGenre: string) => {
		const selected = genre.find((v) => v == selectedGenre);
		if (!selected) return setGenre((p) => [...p, selectedGenre]);

		const removeGenre = genre.filter((v) => v != selectedGenre);
		setGenre(removeGenre);
	};

	return (
		<div className="space-y-3">
			<Select onValueChange={selectHandler}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Select a fruit" />
				</SelectTrigger>
				<SelectContent className="w-full">
					<SelectGroup>
						<SelectLabel>Choose</SelectLabel>
						{GENRES.map((v, i) => (
							<SelectItem key={i} value={v}>
								{v}
								{genre.includes(v) && <CheckCheck />}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			{genre.map((v) => (
				<Button
					key={v}
					className="mr-2 rounded-full"
					size={"sm"}
					title="remove"
					onClick={() => selectHandler(v)}
				>
					{v}
				</Button>
			))}
		</div>
	);
};

export default SelectGenre;
