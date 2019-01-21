export default {
  // These need to be kept secret, not stored in Browser
  app: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  },
  api: {
    domain: process.env.API_DOMAIN || 'localhost:3000',
  },
  auth: {
    domain: process.env.AUTH_DOMAIN || 'statengine-dev.auth.us-east-1.amazoncognito.com',
  },
};
