import EnvVars from '@/common/EnvVars'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const connectionString = `postgresql://${EnvVars.Db.Username}:${EnvVars.Db.Password}@${EnvVars.Db.Hostname}:${EnvVars.Db.Port}/${EnvVars.Db.Database}?schema=public`

const pool = new Pool({
  connectionString: connectionString,
})

const db = drizzle(pool)

export default db
