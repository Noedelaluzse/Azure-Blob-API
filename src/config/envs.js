import 'dotenv/config';
import env from 'env-var'

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  PUBLIC_PATH: env.get('PUBLIC_PATH').required().default('public').asString(),
  JWT_SEED: env.get('JWT_SEED').required().asString(),
  MONGO_URL: env.get('MONGO_URL').required().asString(),
  CLOUDINARY_URL: env.get('CLOUDINARY_URL').required().asString()
}