import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@libs/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { idp, sp } from '@libs/saml';
import { User } from '../user';

export default withIronSessionApiRoute(loginCallbackRoute, sessionOptions);

async function loginCallbackRoute(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { extract } = await sp.parseLoginResponse(idp, 'post', req);
		console.log(`user session data from saml:`, JSON.stringify(extract, null, 2));

		const user = { isLoggedIn: true, login: extract.nameID, sessionInfo: extract } as User;
		req.session.user = user;
		await req.session.save();
		res.writeHead(302, { location: '/profile-sg' });
		res.end();
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: (error as Error).message });
	}
}
