import 'reflect-metadata';
import { Connection, createConnection, getConnectionOptions } from 'typeorm';

async function connection(): Promise<Connection> {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            database: process.env.DATABASE_DATABASE_NAME ||"schedule_mass",
            port: 3306,
            host: process.env.DATABASE_HOST || "localhost",
            username: process.env.DATABASE_USERNAME || "root",
            password: process.env.DATABASE_PASSWORD || ""
        }
        )
    )
}

export default  connection();
