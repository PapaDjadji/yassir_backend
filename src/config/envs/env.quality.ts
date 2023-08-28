import * as path from 'path';

const projectRootPath = path.join(__dirname, '../../../../../');
require('dotenv').config({ path: path.join(projectRootPath, '.env') });

export const config = {
  db: {
    uri: process.env.MONGODB_URL_LOCAL,
  },
  port: process.env.PORT,
  key_api_air_quality : process.env.KEY_API_AIR_QUALITY,
  api_url_api_air_quality:process.env.API_URL_API_AIR_QUALITY,
  timezone: {
    zone: 'Africa/Dakar',
  },
};
