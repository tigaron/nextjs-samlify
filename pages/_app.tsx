import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import fetchJson from '@libs/fetchJson';

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SWRConfig
			value={{
				fetcher: fetchJson,
				onError: (error) => {
					console.error(error as Error);
				},
			}}
		>
			<Component {...pageProps} />
		</SWRConfig>
	);
}
