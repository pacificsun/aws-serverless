import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
  region: process.env.BUCKET_REGION
});

export async function getSignedUrl(s3key) {
  const url = s3.getSignedUrl('getObject', {
    Bucket: process.env.BUCKET_NAME,
    Key: s3key
  });

  return url;
}
