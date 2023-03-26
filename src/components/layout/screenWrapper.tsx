import Header from "./header";
import Footer from "./footer";
import DefaultHead from "../meta/defaultHead";
import { useEffect, useState } from "react";
interface ScreenWrapperProps {
	children?: React.ReactNode;
	layout?:
		| "full-width"
		| "one-column"
		| "left-margin"
		| "right-margin"
		| "three-columns";
	noMobileFooter?: Boolean;
	title?: string;
	className?: string;
	status?: number;
	error?: string;
}
export type PageProps<T> = {
	data: T;
	status: number;
	error: string;
};

export default function ScreenWrapper({
	children,
	layout,
	noMobileFooter = true,
	title,
	className = "",
	status,
	error,
}: ScreenWrapperProps) {
	return (
		<>
			{/* TODO: important: fix default  head */}
			{/* {title ? <DefaultHead title={title} /> : <></>} */}
			<div id="app-container">
				<div id="app-header">
					<Header />
				</div>
				<div id="page-container" className={`${layout} ${className}`}>
					{status === 200 || !status ? (
						// todo: ^^ make this accept all good status's
						<>{children}</>
					) : (
						<div className="error">
							<h2>Error: {status}</h2>
							{error}
						</div>
					)}
				</div>
				<Footer />
			</div>
		</>
	);
}
