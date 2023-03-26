import React, { createContext } from "react";
import AllData, { Data } from "./context";

export const Context = createContext<Data>({
	loggedIn: false,
	setLoggedIn: () => {},
	pubAddress: "",
	setPubAddress: () => {},
});

export const Provider = ({ children }: any) => {
	const data = AllData();
	return <Context.Provider value={data}>{children}</Context.Provider>;
};
