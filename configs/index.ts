import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'local'}` });

export const { NODE_ENV, SSO_ENTRYPOINT, SSO_ISSUER, SSO_CALLBACK_URL, SSO_CERT, TOKEN_SECRET } = process.env;
