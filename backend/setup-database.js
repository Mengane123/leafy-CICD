require('dotenv').config();
const { Client } = require('pg');

async function setupDatabase() {
    // First, connect to the default 'postgres' database to create leafy_db
    const client = new Client({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
        database: 'postgres', // Connect to default database first
        port: process.env.DB_PORT || 5432
    });

    try {
        await client.connect();
        console.log('Connected to PostgreSQL');

        // Check if database exists
        const checkDb = await client.query(
            "SELECT 1 FROM pg_database WHERE datname = 'leafy_db'"
        );

        if (checkDb.rows.length === 0) {
            // Create database
            await client.query('CREATE DATABASE leafy_db');
            console.log('✓ Database leafy_db created successfully');
        } else {
            console.log('✓ Database leafy_db already exists');
        }

        await client.end();

        // Now connect to leafy_db to create tables
        const dbClient = new Client({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD,
            database: 'leafy_db',
            port: process.env.DB_PORT || 5432
        });

        await dbClient.connect();
        console.log('Connected to leafy_db');

        // Create all tables
        const createTablesSQL = `
            -- Create users table
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                FName VARCHAR(100) NOT NULL,
                LName VARCHAR(100) NOT NULL,
                Email VARCHAR(255) UNIQUE NOT NULL,
                Password VARCHAR(255) NOT NULL,
                role VARCHAR(50) DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Create user_profile table
            CREATE TABLE IF NOT EXISTS user_profile (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                address TEXT,
                gender VARCHAR(20),
                dob DATE,
                phone VARCHAR(20),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Create contactus table
            CREATE TABLE IF NOT EXISTS contactus (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                number VARCHAR(20) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Create form table
            CREATE TABLE IF NOT EXISTS form (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                mobile VARCHAR(20) NOT NULL,
                email VARCHAR(255) NOT NULL,
                address TEXT NOT NULL,
                location VARCHAR(255) NOT NULL,
                garden_service VARCHAR(255) NOT NULL,
                garden_area VARCHAR(100) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Create forms table
            CREATE TABLE IF NOT EXISTS forms (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                mobile VARCHAR(20) NOT NULL,
                email VARCHAR(255) NOT NULL,
                address TEXT NOT NULL,
                location VARCHAR(255) NOT NULL,
                garden_area VARCHAR(100) NOT NULL,
                garden_service VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Create admin table
            CREATE TABLE IF NOT EXISTS admin (
                id SERIAL PRIMARY KEY,
                adminName VARCHAR(255) NOT NULL,
                adminEmail VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Create plants table
            CREATE TABLE IF NOT EXISTS plants (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                scientific_name VARCHAR(255),
                description TEXT,
                price DECIMAL(10, 2),
                image_url VARCHAR(500),
                category VARCHAR(100),
                stock_quantity INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Create GardeningTools table
            CREATE TABLE IF NOT EXISTS GardeningTools (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2),
                image_url VARCHAR(500),
                category VARCHAR(100),
                stock_quantity INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Create Orders table
            CREATE TABLE IF NOT EXISTS Orders (
                Id SERIAL PRIMARY KEY,
                FName VARCHAR(100) NOT NULL,
                LName VARCHAR(100) NOT NULL,
                Email VARCHAR(255) NOT NULL,
                Phone VARCHAR(20) NOT NULL,
                Address TEXT NOT NULL,
                Total_price DECIMAL(10, 2) NOT NULL,
                Discount DECIMAL(10, 2) DEFAULT 0,
                Final_price DECIMAL(10, 2) NOT NULL,
                Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(50) DEFAULT 'pending'
            );

            -- Create Order_items table
            CREATE TABLE IF NOT EXISTS Order_items (
                Id SERIAL PRIMARY KEY,
                Order_id INTEGER REFERENCES Orders(Id) ON DELETE CASCADE,
                Product_name VARCHAR(255) NOT NULL,
                Quantity INTEGER NOT NULL,
                Price DECIMAL(10, 2) NOT NULL,
                Subtotal DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await dbClient.query(createTablesSQL);
        console.log('✓ All tables created successfully');

        // Create indexes
        const createIndexesSQL = `
            CREATE INDEX IF NOT EXISTS idx_users_email ON users(Email);
            CREATE INDEX IF NOT EXISTS idx_user_profile_user_id ON user_profile(user_id);
            CREATE INDEX IF NOT EXISTS idx_orders_email ON Orders(Email);
            CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON Order_items(Order_id);
            CREATE INDEX IF NOT EXISTS idx_form_email ON form(email);
            CREATE INDEX IF NOT EXISTS idx_forms_email ON forms(email);
        `;

        await dbClient.query(createIndexesSQL);
        console.log('✓ Indexes created successfully');

        // Create update function and triggers
        const createFunctionSQL = `
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = CURRENT_TIMESTAMP;
                RETURN NEW;
            END;
            $$ language 'plpgsql';
        `;

        await dbClient.query(createFunctionSQL);
        console.log('✓ Update function created successfully');

        const createTriggersSQL = `
            DROP TRIGGER IF EXISTS update_user_profile_updated_at ON user_profile;
            CREATE TRIGGER update_user_profile_updated_at BEFORE UPDATE ON user_profile
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

            DROP TRIGGER IF EXISTS update_plants_updated_at ON plants;
            CREATE TRIGGER update_plants_updated_at BEFORE UPDATE ON plants
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

            DROP TRIGGER IF EXISTS update_gardeningtools_updated_at ON GardeningTools;
            CREATE TRIGGER update_gardeningtools_updated_at BEFORE UPDATE ON GardeningTools
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
        `;

        await dbClient.query(createTriggersSQL);
        console.log('✓ Triggers created successfully');

        await dbClient.end();
        console.log('\n✅ Database setup completed successfully!');
        console.log('You can now start your application.');

    } catch (err) {
        console.error('❌ Error setting up database:', err.message);
        process.exit(1);
    }
}

setupDatabase();
