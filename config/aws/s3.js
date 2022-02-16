import { S3 as _S3 } from 'aws-sdk';
import config from '../env';

const { INSTRAIL_SECRET_ACCESS_KEY, INSTRAIL_AWS_BUCKET_NAME, INSTRAIL_ACCESS_KEY_ID } = config;
const S3 = new _S3({
  accessKeyId: INSTRAIL_ACCESS_KEY_ID,
  secretAccessKey: INSTRAIL_SECRET_ACCESS_KEY,
  ACL: 'public-read'
});

export default { INSTRAIL_AWS_BUCKET_NAME, S3 };
