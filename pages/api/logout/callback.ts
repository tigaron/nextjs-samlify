import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@libs/session';
import { NextApiRequest, NextApiResponse } from 'next';

export default withIronSessionApiRoute(logoutCallbackRoute, sessionOptions);

async function logoutCallbackRoute(req: NextApiRequest, res: NextApiResponse) {
	req.session.destroy();
	res.writeHead(302, { location: '/' });
	res.end();
}
