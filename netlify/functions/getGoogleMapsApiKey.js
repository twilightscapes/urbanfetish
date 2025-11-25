import dotenv from 'dotenv';
dotenv.config();

export const handler = async (event, context) => {
  // Use production key by default, fallback to dev key if in development
  const isProd = process.env.CONTEXT === 'production' || !process.env.CONTEXT;
  const apiKey = isProd ? process.env.GOOGLE_MAPS_API_KEY : process.env.GOOGLE_MAPS_API_KEY_DEV;

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      apiKey: apiKey
    })
  };
};
