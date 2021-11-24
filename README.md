## Usage
1. Create .env file at the project root directory, which contains:
   - MONGO_URI
   - DB_NAME
   - CRON_TIME: `0-59/10 * * * * *` 
   - BACKUP_LIMIT: Maximum number of backups allowed
2. `docker compose up`    

## Restore
1. `mkdir restore` from project root directory
2. `mongod --dbpath restore`
3. `mongorestore --gzip --archive=dump/${Filename}.gz`