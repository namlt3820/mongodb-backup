import { config } from "dotenv";

config();

const { MONGO_URI, DB_NAME, CRON_TIME, BACKUP_LIMIT } = process.env;

["MONGO_URI", "DB_NAME", "CRON_TIME", "BACKUP_LIMIT"].forEach((el) => {
	if (!process.env[el]) {
		throw new Error(`${el} is required`);
	}
});

export { MONGO_URI, DB_NAME, CRON_TIME, BACKUP_LIMIT };
