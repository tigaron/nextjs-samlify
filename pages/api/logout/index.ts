import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@libs/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { idp, sp } from '@libs/saml';

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
	try {
		console.log(`user session from logout request:`, JSON.stringify(req.session.user, null, 2));
		const { id, context } = sp.createLogoutRequest(idp, 'redirect', req.session?.user?.login, process.env.SLO_CALLBACK_URL);
		console.log(`id of logout request:`, id);
		console.log(`context of logout request:`, context);
		return res.redirect(context);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: (error as Error).message });
	}
}
