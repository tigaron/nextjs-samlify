import { readFileSync } from 'fs';
import * as samlify from 'samlify';
import * as validator from '@authenio/samlify-node-xmllint';

const response = await fetch(process.env.IDP_METADATA as string);
const body = await response.text();

samlify.setSchemaValidator(validator);

export const idp = samlify.IdentityProvider({
	metadata: body,
});

export const sp = samlify.ServiceProvider({
	entityID: 'next-auth-saml',
	authnRequestsSigned: true,
	wantLogoutRequestSigned: true,
	privateKey: readFileSync('./certs/private.key'),
	privateKeyPass: process.env.SP_PRIVATE_KEY_PASS,
	assertionConsumerService: [
		{
			Binding: samlify.Constants.namespace.binding.post,
			Location: process.env.SSO_CALLBACK_URL as string,
		},
	],
});
