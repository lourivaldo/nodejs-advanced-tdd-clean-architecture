export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '1830572067135382',
    clientSecret: process.env.FB_CLIENT_SECRET ?? 'XXX'
  },
  s3: {
    accessKey: process.env.S3_ACCESS_KEY_ID ?? '',
    secret: process.env.S3_SECRET_ACCESS_KEY ?? '',
    bucket: process.env.S3_BUCKET ?? ''
  },
  appPort: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'secret'
}
