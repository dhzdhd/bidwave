import { env } from '$env/dynamic/public';

export const CMS_URL = env.PUBLIC_CMS_URL ?? 'http://127.0.0.1:1337';
