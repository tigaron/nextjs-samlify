import { readFileSync } from 'fs';
import * as samlify from 'samlify';
import * as validator from '@authenio/samlify-node-xmllint';

samlify.setSchemaValidator(validator);

export const idp = samlify.IdentityProvider({
	metadata: readFileSync('./certs/idp.xml'),
});

export const sp = samlify.ServiceProvider({
	entityID: process.env.SP_IDENTITY,
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
