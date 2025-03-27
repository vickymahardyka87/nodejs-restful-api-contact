import { prismaClient } from '../src/app/database';
import bcrypt from 'bcrypt';

// USER
export const createTestUser = async () => {
	await prismaClient.user.create({
		data: {
			username: 'test',
			password: await bcrypt.hash('rahasia', 10),
			name: 'test',
			token: 'test',
		},
	});
};

export const getTestUser = async () => {
	return prismaClient.user.findUnique({
		where: {
			username: 'test',
		},
	});
};

export const removeTestUser = async () => {
	await prismaClient.user.deleteMany({
		where: {
			username: 'test',
		},
	});
};

// CONTACT
export const createTestContact = async () => {
	await prismaClient.contact.create({
		data: {
			username: 'test',
			first_name: 'test',
			last_name: 'test',
			email: 'test@gmail.com',
			phone: '0987654321',
		},
	});
};

export const createManyTestContact = async () => {
	for (let i = 0; i < 15; i++) {
		await prismaClient.contact.create({
			data: {
				username: 'test',
				first_name: `test ${i}`,
				last_name: `test ${i}`,
				email: `test${i}@gmail.com`,
				phone: `0987654321${i}`,
			},
		});
	}
};

export const getTestContact = async () => {
	return prismaClient.contact.findFirst({
		where: {
			username: 'test',
		},
	});
};

export const removeAllTestContact = async () => {
	await prismaClient.contact.deleteMany({
		where: {
			username: 'test',
		},
	});
};

// ADDRESS
export const createTestAddress = async () => {
	const contact = await getTestContact();
	return prismaClient.address.create({
		data: {
			contact_id: contact.id,
			street: 'jalan test',
			city: 'kota test',
			province: 'provinsi test',
			country: 'Indonesia',
			postal_code: '63482',
		},
	});
};

export const getTestAddress = async () => {
	return prismaClient.address.findFirst({
		where: {
			contact: {
				username: 'test',
			},
		},
	});
};

export const removeAllTestAddresses = async () => {
	await prismaClient.address.deleteMany({
		where: {
			contact: {
				username: 'test',
			},
		},
	});
};

export const removeAllTestData = async () => {
	await removeAllTestAddresses();
	await removeAllTestContact();
	await removeTestUser();
};

export const createAllTestData = async () => {
	await createTestUser();
	await createTestContact();
	await createTestAddress();
};
