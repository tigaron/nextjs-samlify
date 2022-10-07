import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@libs/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { idp, sp } from '@libs/saml';

export default withIronSessionApiRoute(logoutCallbackRoute, sessionOptions);

async function logoutCallbackRoute(req: NextApiRequest, res: NextApiResponse) {
	req.session.destroy();
	res.status(307).redirect('/');
}
