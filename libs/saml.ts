import * as samlify from 'samlify';
import * as validator from '@authenio/samlify-node-xmllint';

samlify.setSchemaValidator(validator);

export const idp = samlify.IdentityProvider({
	metadata: Buffer.from(process.env.IDP_METADATA as string, 'base64'),
});

export const sp = samlify.ServiceProvider({
	entityID: process.env.SP_IDENTITY,
	authnRequestsSigned: true,
	wantLogoutRequestSigned: true,
	privateKey: Buffer.from(process.env.SIGN_B64_PRIVATE_KEY as string, 'base64'),
	privateKeyPass: process.env.SP_PRIVATE_KEY_PASS,
	assertionConsumerService: [
		{
			Binding: samlify.Constants.namespace.binding.post,
			Location: process.env.SSO_CALLBACK_URL as string,
		},
	],
});
