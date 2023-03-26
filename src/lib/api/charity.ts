import client from "./client";
const endpoint = "/charity";
// todo: add type to create body
const createCharity = (body: any) =>
	client.post(`${endpoint}/create`, { ...body });
const getCharity = ({ charityId }) => client.get(`${endpoint}/${charityId}`);

const charityApi = {
	createCharity,
	getCharity,
};
export default charityApi;
