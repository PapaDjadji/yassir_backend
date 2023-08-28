import * as path from 'path';
const projectRootPath = path.join(__dirname, '../../../../../');
require('dotenv').config({ path: path.join(projectRootPath, '.env') });

export const config = {
  port: 3080,
  db: {},
  jwtAlgorithm: process.env.ALG,
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
  timezone: {
    zone: 'Africa/Dakar',
  },
  accountId : process.env.LAM_ACCOUNT_ID,
  password : process.env.LAM_PASSWORD,
  LAM_API : process.env.LAM_API,
  AwsAccessKeyId : process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY,
  awsS3BucketName : process.env.AWS_S3_BUCKET_NAME,
  OM_GRANT_TYPE: process.env.OM_GRANT_TYPE,
  ORANGE_AUTHENTICATION_ENDPOINT : process.env.ORANGE_AUTHENTICATION_ENDPOINT,
  OM_CLIENT_SECRET: process.env.OM_CLIENT_SECRET,
  OM_PIN_CODE : process.env.OM_NEW_PIN,
  OM_CLIENT_ID : process.env.OM_CLIENT_ID,
  OM_MERCHANT_CODE : process.env.OM_MERCHANT_CODE,
  orangeApi : process.env.ORANGE_API,
  freeMoneyApi : process.env.FREEMONEY_API,
  MSISDN_FREE_MONEY: process.env.MSISDN_FREE_MONEY,
  PIN_FREE_MONEY : process.env.PIN_FREE_MONEY,
  MSISDN_CASHIN_FREE_MONEY : process.env.MSISDN_CASHIN_FREE_MONEY,
  PIN_CASHIN_FREE_MONEY : process.env.PIN_CASHIN_FREE_MONEY,
  WAVE_AGGREGATED_MERCHANT_ID : process.env.AGGREGATED_MERCHANT_ID, 
};
