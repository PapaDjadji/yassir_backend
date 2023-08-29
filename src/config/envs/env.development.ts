import * as path from 'path';

const projectRootPath = path.join(__dirname, '../../../../');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: path.join(projectRootPath, '.env') });
export const config = {
  db: {
    uri: process.env.MONGODB_URL_LOCAL,
  },
  port: process.env.PORT,
  KEY_API_AIR_QUALITY: process.env.KEY_API_AIR_QUALITY,
  URL_API_AIR_QUALITY:process.env.URL_API_AIR_QUALITY,
  timezone: {
    zone: 'Africa/Dakar',
  }
};
