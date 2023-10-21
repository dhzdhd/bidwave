import { env } from '$env/dynamic/public';

export const CMS_URL = env.PUBLIC_CMS_URL ?? 'http://localhost:1337';
