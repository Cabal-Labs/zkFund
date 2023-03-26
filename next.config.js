// /** @type {import('next').NextConfig} */
// const path = require("path");
// const nextConfig = {
// 	reactStrictMode: true,
// };
// const sassOptions = {
// 	sassOptions: {
// 		includePaths: [path.join(__dirname, "styles")],
// 	},
// };

// module.exports = { nextConfig, sassOptions };
module.exports = {
	reactStrictMode: true,
	images: {
		unoptimized: true,
	},
	env: {
		ALCHEMY_ID: process.env.ALCHEMY_ID,
		WEB_STORAGE: process.env.WEB_STORAGE,
		ETHSCAN_KEY: process.env.ETHSCAN_KEY,
	},
};
