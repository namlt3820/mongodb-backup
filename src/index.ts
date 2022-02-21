import fs from "fs";
import path from "path";
import spawn from "await-spawn";
import { CronJob } from "cron";
import { MONGO_URI, DB_NAME, CRON_TIME, BACKUP_LIMIT } from "./config";

const backup = async () => {
	try {
		const dir = "dump";
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}

		const dateJSON = new Date().toJSON();

		await spawn("mongodump", [
			`--uri=${MONGO_URI}`,
			`--db=${DB_NAME}`,
			`--archive=dump/${DB_NAME}.${dateJSON.replace(/:\s*/g, "-")}.gz`,
			"--gzip",
		]);

		console.log(`Successfully backed up the database at ${dateJSON}`);
	} catch (e) {
		console.log(e);
	}
};

const cleanup = () => {
	try {
		const dir = "dump";
		const files = fs.readdirSync(dir);
		const { length } = files;
		const limit = Number(BACKUP_LIMIT);
		if (length > limit) {
			console.log(
				`Number of backups (${length}) is greater than limit (${limit}), cleaning up ...`
			);
			fs.unlinkSync(path.join(dir, files[0]));
		}
	} catch (e) {
		console.log("Clean up failed");
	}
};

const JobBackup: CronJob = new CronJob(
	CRON_TIME,
	async function () {
		try {
			await backup();
			cleanup();
		} catch (e) {
			console.log(e);
		}
	},
	null,
	false
);

JobBackup.start();
