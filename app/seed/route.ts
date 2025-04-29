import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL as string, { ssl: "require" });

async function createExtension() {
	await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
}

async function seedRoles() {
	await sql`
        CREATE TABLE IF NOT EXISTS role (
            id SERIAL PRIMARY KEY,
            label VARCHAR(50)
        );
    `;

	await sql`
        INSERT INTO role (label) 
        VALUES ('restaurant'), ('backery'), ('admin')
    `;
}

async function seedCompany() {
	await sql`
        CREATE TABLE IF NOT EXISTS company (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            label VARCHAR(150) NOT NULL,
            picture VARCHAR(255),
            tel VARCHAR(20),
            email VARCHAR(150) NOT NULL UNIQUE,
            email_confirm BOOLEAN NOT NULL DEFAULT FALSE,
            password VARCHAR(150) NOT NULL,
            id_role INT NOT NULL DEFAULT 1,
            FOREIGN KEY (id_role) REFERENCES role(id)
        );
    `;
}

async function seedBooking() {
	await sql`
        CREATE TABLE IF NOT EXISTS booking (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            validate BOOLEAN NOT NULL DEFAULT false,
            id_bakery UUID,
            id_restaurant UUID NOT NULL,
            hidden_bakery BOOLEAN NOT NULL DEFAULT false,
            hidden_restaurant BOOLEAN NOT NULL DEFAULT false,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            total_cost FLOAT NOT NULL DEFAULT 0,
            FOREIGN KEY (id_bakery) REFERENCES company(id),
            FOREIGN KEY (id_restaurant) REFERENCES company(id)
        );
    `;
}

async function seedProduct() {
	await sql`
        CREATE TABLE IF NOT EXISTS product (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            label VARCHAR(150) NOT NULL,
            picture VARCHAR(255),
            price FLOAT NOT NULL,
            id_bakery UUID NOT NULL,
            FOREIGN KEY (id_bakery) REFERENCES company(id)
        );
    `;
}

async function seedBookingProduct() {
	await sql`
        CREATE TABLE IF NOT EXISTS booking_product (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            quantity INT NOT NULL DEFAULT 0,
            id_product UUID NOT NULL,
            id_booking UUID NOT NULL,
            FOREIGN KEY (id_product) REFERENCES product(id),
            FOREIGN KEY (id_booking) REFERENCES booking(id)
        );
    `;
}

async function seedContact() {
	await sql`
        CREATE TABLE IF NOT EXISTS contact (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            email VARCHAR(150) NOT NULL,
            message TEXT NOT NULL
        );
    `;
}

export async function GET() {
	try {
		await createExtension();
		await seedRoles();
		await seedCompany();
		await seedBooking();
		await seedProduct();
		await seedBookingProduct();
		await seedContact();

		return Response.json({ message: "La base de données a été crée." });
	} catch (error) {
		return Response.json({ error: error }, { status: 500 });
	}
}
