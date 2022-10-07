import Link from 'next/link';
import useUser from '@libs/useUser';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Header() {
	const { user } = useUser();
	const router = useRouter();

	return (
		<header>
			<nav>
				<ul>
					<li>
						<Link href="/">
							<a>Home</a>
						</Link>
					</li>
					{user?.login === 'admin@test.com' && (
						<li>
							<Link href="/dashboard">
								<a>Dashboard - Admin</a>
							</Link>
						</li>
					)}
					{user?.isLoggedIn === false && (
						<li>
							<Link href="/api/login">
								<a>Login</a>
							</Link>
						</li>
					)}
					{user?.isLoggedIn === true && (
						<>
							<li>
								<Link href="/profile-sg">
									<a>Profile - SG</a>
								</Link>
							</li>
							<li>
								<Link href="/profile-ssr">
									<a>Profile - SSR</a>
								</Link>
							</li>
							<li>
								<Link href="/api/logout">
									<a>Logout</a>
								</Link>
							</li>
						</>
					)}
					<li>
						<a href="#">
							<Image src="/GitHub-Mark-Light-32px.png" width="32" height="32" alt="" />
						</a>
					</li>
				</ul>
			</nav>
			<style jsx>{`
				ul {
					display: flex;
					list-style: none;
					margin-left: 0;
					padding-left: 0;
				}
				li {
					margin-right: 1rem;
					display: flex;
				}
				li:first-child {
					margin-left: auto;
				}
				a {
					color: #fff;
					text-decoration: none;
					display: flex;
					align-items: center;
				}
				a img {
					margin-right: 1em;
				}
				header {
					padding: 0.2rem;
					color: #fff;
					background-color: #333;
				}
			`}</style>
		</header>
	);
}
