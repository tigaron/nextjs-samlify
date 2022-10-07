import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@libs/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { idp, sp } from '@libs/saml';

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
	try {
		const { id, context } = sp.createLoginRequest(idp, 'redirect');
		console.log(`login request id:`, id);
		console.log(`login request context:`, context);
		return res.redirect(context);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: (error as Error).message });
	}
}
