"use client";

import dynamic from "next/dynamic";

const ClientEditor = dynamic(() => import("./editor"));

export default ClientEditor;
