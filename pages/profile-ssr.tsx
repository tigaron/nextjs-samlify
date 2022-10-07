import React from 'react';
import Layout from '@components/Layout';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@libs/session';
import { User } from '@pages/api/user';

import { InferGetServerSidePropsType } from 'next';

export default function SsrProfile({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<Layout>
			<h1>Your profile</h1>
			<h2>
				This page uses <a href="https://nextjs.org/docs/basic-features/pages#server-side-rendering">Server-side Rendering (SSR)</a> and{' '}
				<a href="https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering">getServerSideProps</a>
			</h2>

			{user?.isLoggedIn && (
				<>
					<pre>{JSON.stringify(user, null, 2)}</pre>
				</>
			)}
		</Layout>
	);
}

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
	const user = req.session.user;

	if (user === undefined) {
		res.setHeader('location', '/api/login');
		res.statusCode = 302;
		res.end();
		return {
			props: {
				user: { isLoggedIn: false, login: '', sessionInfo: '' } as User,
			},
		};
	}

	return {
		props: { user: req.session.user },
	};
}, sessionOptions);
