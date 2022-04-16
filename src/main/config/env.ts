export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '1830572067135382',
    clientSecret: process.env.FB_CLIENT_SECRET ?? 'XXX'
  },
  appPort: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'secret'
}
