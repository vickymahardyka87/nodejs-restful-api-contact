import supertest from 'supertest';
import { createAllTestData, getTestAddress, getTestContact, removeAllTestData } from './test-utils.js';
import web from '../src/app/web.js';
import { logger } from '../src/app/logging.js';

// CREATE ADDRESS
describe('POST /api/contacts/:contactId/addresses', () => {
	beforeEach(async () => {
		await createAllTestData();
	});

	afterEach(async () => {
		await removeAllTestData();
	});

	it('should be able to create a new address', async () => {
		const contact = await getTestContact();

		const result = await supertest(web).post(`/api/contacts/${contact.id}/addresses`).set('Authorization', 'test').send({
			street: 'Jalan Soekarno',
			city: 'Ponorogo',
			province: 'Jawa Timur',
			country: 'Indonesia',
			postal_code: '63482',
		});

		logger.info('TEST', result.body);

		expect(result.status).toBe(201);
		expect(result.body.data.id).toBeDefined();
		expect(result.body.data.street).toBe('Jalan Soekarno');
		expect(result.body.data.city).toBe('Ponorogo');
		expect(result.body.data.province).toBe('Jawa Timur');
		expect(result.body.data.country).toBe('Indonesia');
		expect(result.body.data.postal_code).toBe('63482');
	});

	it('should reject to create a new address if request is invalid', async () => {
		const contact = await getTestContact();

		const result = await supertest(web).post(`/api/contacts/${contact.id}/addresses`).set('Authorization', 'test').send({
			street: 'Jalan Soekarno',
			city: 'Ponorogo',
			province: 'Jawa Timur',
			country: '',
			postal_code: '',
		});

		logger.info(result.body);

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to create a new address if contactId is not found', async () => {
		const contact = await getTestContact();

		const result = await supertest(web)
			.post(`/api/contacts/${contact.id + 1}/addresses`)
			.set('Authorization', 'test')
			.send({
				street: 'Jalan Soekarno',
				city: 'Ponorogo',
				province: 'Jawa Timur',
				country: 'Indonesia',
				postal_code: '63482',
			});

		logger.info(result.body);

		expect(result.status).toBe(404);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to create a new address if token is invalid', async () => {
		const contact = await getTestContact();

		const result = await supertest(web).post(`/api/contacts/${contact.id}/addresses`).set('Authorization', 'wrong').send({
			street: 'Jalan Soekarno',
			city: 'Ponorogo',
			province: 'Jawa Timur',
			country: 'Indonesia',
			postal_code: '63482',
		});

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});

// GET ADDRESS
describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
	beforeEach(async () => {
		await createAllTestData();
	});

	afterEach(async () => {
		await removeAllTestData();
	});

	it('should be able to get address', async () => {
		const contact = await getTestContact();
		const address = await getTestAddress();

		const result = await supertest(web).get(`/api/contacts/${contact.id}/addresses/${address.id}`).set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.id).toBeDefined();
		expect(result.body.data.street).toBe('jalan test');
		expect(result.body.data.city).toBe('kota test');
		expect(result.body.data.province).toBe('provinsi test');
		expect(result.body.data.country).toBe('Indonesia');
		expect(result.body.data.postal_code).toBe('63482');
	});

	it('should reject to get address if contactId is not found', async () => {
		const contact = await getTestContact();
		const address = await getTestAddress();

		const result = await supertest(web)
			.get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
			.set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(404);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to get address if addressId is not found', async () => {
		const contact = await getTestContact();
		const address = await getTestAddress();

		const result = await supertest(web)
			.get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
			.set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(404);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to get address if token is invalid', async () => {
		const contact = await getTestContact();
		const address = await getTestAddress();

		const result = await supertest(web).get(`/api/contacts/${contact.id}/addresses/${address.id}`).set('Authorization', 'wrong');

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});

// UPDATE ADDRESS
describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {
	beforeEach(async () => {
		await createAllTestData();
	});

	afterEach(async () => {
		await removeAllTestData();
	});

	it('should be able to update address', async () => {
		const contact = await getTestContact();
		const address = await getTestAddress();

		const result = await supertest(web).put(`/api/contacts/${contact.id}/addresses/${address.id}`).set('Authorization', 'test').send({
			street: 'street',
			city: 'city',
			province: 'province',
			country: 'Indonesia',
			postal_code: '121212',
		});

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.id).toBe(address.id);
		expect(result.body.data.street).toBe('street');
		expect(result.body.data.city).toBe('city');
		expect(result.body.data.province).toBe('province');
		expect(result.body.data.country).toBe('Indonesia');
		expect(result.body.data.postal_code).toBe('121212');
	});

	it('should reject to update address if request is invalid', async () => {
		const contact = await getTestContact();
		const address = await getTestAddress();

		const result = await supertest(web).put(`/api/contacts/${contact.id}/addresses/${address.id}`).set('Authorization', 'test').send({
			street: 'street',
			city: 'city',
			province: 'province',
			country: '',
			postal_code: '',
		});

		logger.info(result.body);

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to update address if contactId is not found', async () => {
		const contact = await getTestContact();
		const address = await getTestAddress();

		const result = await supertest(web)
			.put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
			.set('Authorization', 'test')
			.send({
				street: 'street',
				city: 'city',
				province: 'province',
				country: 'Indonesia',
				postal_code: '121212',
			});

		logger.info(result.body);

		expect(result.status).toBe(404);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to update address if addressId is not found', async () => {
		const contact = await getTestContact();
		const address = await getTestAddress();

		const result = await supertest(web)
			.put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
			.set('Authorization', 'test')
			.send({
				street: 'street',
				city: 'city',
				province: 'province',
				country: 'Indonesia',
				postal_code: '121212',
			});

		logger.info(result.body);

		expect(result.status).toBe(404);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to update address if token is invalid', async () => {
		const contact = await getTestContact();
		const address = await getTestAddress();

		const result = await supertest(web).put(`/api/contacts/${contact.id}/addresses/${address.id}`).set('Authorization', 'wrong').send({
			street: 'street',
			city: 'city',
			province: 'province',
			country: 'Indonesia',
			postal_code: '121212',
		});

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});

// DELETE ADDRESS
describe('DELETE /api/contacts/:contactId/addresses/:addressId', () => {
	beforeEach(async () => {
		await createAllTestData();
	});

	afterEach(async () => {
		await removeAllTestData();
	});

	it('should be able to remove address', async () => {
		const contact = await getTestContact();
		let address = await getTestAddress();

		const result = await supertest(web).delete(`/api/contacts/${contact.id}/addresses/${address.id}`).set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data).toBe('OK');

		address = await getTestAddress();
		expect(address).toBeNull();
	});

	it('should reject to remove address if addressId is not found', async () => {
		const contact = await getTestContact();
		let address = await getTestAddress();

		const result = await supertest(web)
			.delete(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
			.set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(404);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to remove address if contactId is not found', async () => {
		const contact = await getTestContact();
		let address = await getTestAddress();

		const result = await supertest(web)
			.delete(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
			.set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(404);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to remove address if token is invalid', async () => {
		const contact = await getTestContact();
		let address = await getTestAddress();

		const result = await supertest(web).delete(`/api/contacts/${contact.id}/addresses/${address.id}`).set('Authorization', 'wrong');

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});

// LIST ADDRESS
describe('GET /api/contacts/:contactId/addresses', () => {
	beforeEach(async () => {
		await createAllTestData();
	});

	afterEach(async () => {
		await removeAllTestData();
	});

	it('should be able to list addresses', async () => {
		const contact = await getTestContact();

		const result = await supertest(web).get(`/api/contacts/${contact.id}/addresses`).set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.length).toBe(1);
	});

	it('should reject to list addresses if contactId is not found', async () => {
		const contact = await getTestContact();

		const result = await supertest(web)
			.get(`/api/contacts/${contact.id + 1}/addresses`)
			.set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(404);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to list addresses if token is invalid', async () => {
		const contact = await getTestContact();

		const result = await supertest(web).get(`/api/contacts/${contact.id}/addresses`).set('Authorization', 'wrong');

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});
