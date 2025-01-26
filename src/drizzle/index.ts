import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

import * as schema from './schema';

const connection = process.env.DATABASE_URL!;

const db = drizzle(postgres(connection), { schema });

export default db;
