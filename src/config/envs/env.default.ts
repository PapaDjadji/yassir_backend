import * as path from 'path';

const projectRootPath = path.join(__dirname, '../../../../');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: path.join(projectRootPath, '.env') });
export const config = {
  port: process.env.PORT,
  jwtAlgorithm: process.env.ALG,
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
  db: {
    uri: process.env.MONGODB_URL,
  },
  timezone: {
    zone: 'Africa/Dakar',
  },
  env: process.env.NODE_ENV,
  root: path.normalize(`${__dirname}/../..`),
};
