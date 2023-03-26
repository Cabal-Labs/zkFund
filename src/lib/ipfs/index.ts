import { Web3Storage, Web3File, Web3Response } from "web3.storage";

function getAccessToken() {
	return process.env.WEB_STORAGE;
}

function makeStorageClient() {
	return new Web3Storage({ token: getAccessToken() });
}

function makeFileObjects(obj: any) {
	const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });

	const files = [
		new File(["contents-of-file-1"], "plain-utf8.txt"),
		new File([blob], "charity.json"),
	];
	return files;
}

async function storeFiles(files: any) {
	const client = makeStorageClient();
	const cid = await client.put(files);
	console.log("stored files with cid:", cid);
	return cid;
}

async function getFiles(cid: any) {
	const client = makeStorageClient();
	const res: Web3Response = await client.get(cid);
	const files: Web3File[] = await res.files();
	let response: Web3File;
	for await (const file of files) {
		console.log(`${file.cid} ${file.name} ${file.size}`);
		response = file;
	}
	return response;
}

function ipfsToHTTP(cid: string) {
	return `https://${cid}.ipfs.w3s.link/charity.json`;
}

async function retrieveCharity(cid: string) {
	const _cid = ipfsToHTTP(cid);
	try {
		const res = await fetch(_cid);
		const data = await res.json();
		return data;
	} catch (e) {
		console.log(e);
		try {
			const res = await getFiles(cid);
			const data = await res.text();
			return data;
		} catch (e) {
			console.log(e);
		}
	}
}

export {
	storeFiles,
	retrieveCharity as retriveCharity,
	getFiles,
	ipfsToHTTP,
	makeFileObjects,
};
