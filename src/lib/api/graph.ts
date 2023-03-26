// handles api requests related to validating charities
import { createClient } from "urql";
import { retriveCharity as retrieveCharity } from "../ipfs";
const APIURL =
	"";
const client = createClient({
	url: APIURL,
});
// access all requests events using the graph
export async function GetAllCharities() {
	const query = `
    {
        charityCreateds {
            id
            name
            charityId
            status
            charityAddress
          }
    }
    `;
	// make the request
	let result = await client.query(query, {}).toPromise();
	console.log({ result });
	return result.data.charityCreateds;
}
export async function SearchCharities(search: string) {
	const query = `
    {
        charityCreateds(where: {name_starts_with_nocase: "${search}"}) {
            id
            charityAddress
            name
            charityId
            status
          }
        }`;
	let result = await client.query(query, { search }).toPromise();
	return result.data.charityCreateds;
}
export async function GetVoteState(
	validatorAddress: string,
	charityId: number
) {
	const query = `
    {
        approveVotes(where: {validator: "${validatorAddress}", charityId: ${charityId}}) {
            id
        }
        disapproveVotes(where: {validator: "${validatorAddress}", charityId: ${charityId}}) {
            id
        }
    }`;
	let result = await client
		.query(query, { validatorAddress, charityId })
		.toPromise();
	return result.data.approveVotes;
}
export async function getCharityInfo(charityId: number) {
	console.log("ID: ", charityId);
	const query = `
    {
        charityCreateds(where: {charityId: "${charityId}"}) {
            id
            charityId
            name
            charityAddress
            status
            info
        }
    }`;
	let result = await client.query(query, { charityId }).toPromise();
	console.log(result);
	let info = result.data.charityCreateds[0].info;

	let charityInfo = await retrieveCharity(info);
	console.log({ charityInfo });
	let charity = { ...result.data.charityCreateds[0], ...charityInfo };
	console.log("Charity: ", charity);
	return charity;
}

export async function getPendingCharities() {
	const status = 0;
	const query = `
    {
        charityCreateds(where: {status: 0}) {
          info
          name
          id
          status
          charityId
          charityAddress
        }
      }`;
	let result = await client.query(query, { status }).toPromise();
	console.log("in validation: ", result);
	return result.data;
}

export async function getApprovedCharities(charityId: number) {
	const status = 2;
	const query = `
    {
        charityCreateds(where: {status: 2}) {
          info
          name
          id
          status
          charityId
          charityAddress
        }
      }`;
	let result = await client.query(query, { status }).toPromise();
	console.log("in validation: ", result);
	return result.data.charityCreateds;
}
export async function getDisapprovedCharities(charityId: number) {
	const status = 1;
	const query = `
    {
        charityCreateds(where: {status: 1}) {
          info
          name
          id
          status
          charityId
          charityAddress
        }
      }`;
	let result = await client.query(query, { status }).toPromise();
	console.log("in validation: ", result);
	return result.data;
}

// export async function GetCharityRequests() {
// 	const query = `
//     {
//         CharityCreated {
//             name
//         }
//     }
//     `;
// }
