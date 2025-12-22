import {config} from 'dotenv';
config()

export const envConfig = {
    port : process.env.PORT,
    DB_URL : process.env.DB_URL
}
