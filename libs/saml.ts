import * as samlify from 'samlify';
import * as validator from '@authenio/samlify-node-xmllint';

samlify.setSchemaValidator(validator);

export const idp = samlify.IdentityProvider({
	metadata: Buffer.from(process.env.IDP_METADATA as string, 'base64'),
	wantAuthnRequestsSigned: true,
	wantLogoutRequestSigned: true,
	wantLogoutResponseSigned: true,
	signingCert: Buffer.from(process.env.SIGN_B64_CERTIFICATE as string, 'base64'),
	privateKey: Buffer.from(process.env.SIGN_B64_PRIVATE_KEY as string, 'base64'),
	privateKeyPass: process.env.SP_PRIVATE_KEY_PASS,
});

export const sp = samlify.ServiceProvider({
	metadata: Buffer.from(process.env.SP_METADATA as string, 'base64'),
	privateKey: Buffer.from(process.env.SIGNING_KEY as string, 'base64'),
	encPrivateKey: Buffer.from(process.env.ENCRYPTION_KEY as string, 'base64'),
});
