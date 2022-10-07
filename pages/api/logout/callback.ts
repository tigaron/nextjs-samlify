import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@libs/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { idp, sp } from '@libs/saml';

export default withIronSessionApiRoute(logoutCallbackRoute, sessionOptions);

async function logoutCallbackRoute(req: NextApiRequest, res: NextApiResponse) {
	const { extract } = await sp.parseLogoutRequest(idp, 'post', req);
	console.log(`user session data from saml:`, JSON.stringify(extract, null, 2));
	req.session.destroy();
	res.status(307).redirect('/');
}
