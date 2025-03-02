import { VercelRequest, VercelResponse } from "@vercel/node";
// import { OAuth2Client } from "google-auth-library";
import { getIronSession } from "iron-session";
import { randomUUID } from "node:crypto";

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface Session {
	userId: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	// const { credential } = req.body;

	// console.log(process.env);

	const session = await getIronSession<Session>(req, res, {
		cookieName: "sess",
		password: process.env.AUTH_SECRET!,
		ttl: 60 * 60 * 3,
	});

	session.userId = randomUUID();
	await session.save();

	return res.status(200).json({ success: true });

	// try {
	// 	// 	const ticket = await client.verifyIdToken({
	// 	// 		idToken: credential,
	// 	// 		audience: process.env.GOOGLE_CLIENT_ID,
	// 	// 	});

	// 	// 	const payload = ticket.getPayload();

	// 	console.log(session);

	// 	// Return user info - customize this based on your needs
	// 	return res.status(200).json({ success: true });
	// } catch (error) {
	// 	return res.status(401).json({ error: "Invalid token" });
	// }
}
