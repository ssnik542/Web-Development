const _config = {
  port: process.env.PORT,
  databaseURL: process.env.MONGO_CONNECTION_STRING,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.SECRET,
  cloudinarycloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryAPIKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryAPISecret: process.env.CLOUDINARY_API_SECRET,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
};

export const config = Object.freeze(_config);
