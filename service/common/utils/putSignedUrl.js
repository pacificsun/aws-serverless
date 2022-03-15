import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
  region: process.env.BUCKET_REGION
});

export function putSignedUrl(key, contentType) {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    ACL: 'public-read',
    ContentType: contentType
  };

  const signedUrl = s3.getSignedUrl('putObject', params);
  return signedUrl;
}
