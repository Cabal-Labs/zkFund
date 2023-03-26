import client from "./client";
const endpoint = "/charities";

const getAllCharities = () => client.get(`${endpoint}`);
const getCharities = ({ search }) => client.get(`${endpoint}?s=${search}`);

const charitiesApi = {
	getAllCharities,
	getCharities,
};
export default charitiesApi;
