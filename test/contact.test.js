import supertest from 'supertest';
import { createAllTestData, createManyTestContact, createTestContact, createTestUser, getTestContact, removeAllTestData } from './test-utils.js';
import { logger } from '../src/app/logging.js';
import web from '../src/app/web.js';

// CREATE CONTACT
describe('POST /api/contacts', () => {
	beforeEach(async () => {
		await createAllTestData();
	});

	afterEach(async () => {
		await removeAllTestData();
	});
	it('should be able to create new contact', async () => {
		const result = await supertest(web).post('/api/contacts').set('Authorization', 'test').send({
			first_name: 'test',
			last_name: 'test',
			email: 'test@gmail.com',
			phone: '0987654321',
		});

		logger.info(result.body);

		expect(result.status).toBe(201);
		expect(result.body.data.id).toBeDefined();
		expect(result.body.data.first_name).toBe('test');
		expect(result.body.data.last_name).toBe('test');
		expect(result.body.data.email).toBe('test@gmail.com');
		expect(result.body.data.phone).toBe('0987654321');
	});

	it('should reject create new contact if request is invalid', async () => {
		const result = await supertest(web).post('/api/contacts').set('Authorization', 'test').send({
			first_name: '',
			last_name: '',
			email: 'testgmail.com',
			phone: '0987654321234567890987654321',
		});

		logger.info(result.body);

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject create new contact if token is invalid', async () => {
		const result = await supertest(web).post('/api/contacts').set('Authorization', 'wrong').send({
			first_name: 'test',
			last_name: 'test',
			email: 'test@gmail.com',
			phone: '0987654321',
		});

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});

// GET CONTACT
describe('GET /api/contacts/:contactId', () => {
	beforeEach(async () => {
		await createAllTestData();
	});

	afterEach(async () => {
		await removeAllTestData();
	});

	it('should be able to get contact', async () => {
		const contact = await getTestContact();
		const result = await supertest(web).get(`/api/contacts/${contact.id}`).set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.id).toBe(contact.id);
		expect(result.body.data.first_name).toBe(contact.first_name);
		expect(result.body.data.last_name).toBe(contact.last_name);
		expect(result.body.data.email).toBe(contact.email);
		expect(result.body.data.phone).toBe(contact.phone);
	});

	it('should reject to get contact if contactId is not found', async () => {
		const contact = await getTestContact();
		const result = await supertest(web)
			.get(`/api/contacts/${contact.id + 1}`)
			.set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(404);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to get contact if token is invalid', async () => {
		const contact = await getTestContact();
		const result = await supertest(web).get(`/api/contacts/${contact.id}`).set('Authorization', 'wrong');

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});

// UPDATE CONTACT
describe('PUT /api/contacts/:contactId', () => {
	beforeEach(async () => {
		await createAllTestData();
	});

	afterEach(async () => {
		await removeAllTestData();
	});

	it('should be able to update existing contact', async () => {
		const contact = await getTestContact();

		const result = await supertest(web).put(`/api/contacts/${contact.id}`).set('Authorization', 'test').send({
			first_name: 'Vicky Pratama',
			last_name: 'Setia Mahardika',
			email: 'vicky@gmail.com',
			phone: '098989898989',
		});

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.id).toBe(contact.id);
		expect(result.body.data.first_name).toBe('Vicky Pratama');
		expect(result.body.data.last_name).toBe('Setia Mahardika');
		expect(result.body.data.email).toBe('vicky@gmail.com');
		expect(result.body.data.phone).toBe('098989898989');
	});

	it('should reject to update contact if request is invalid', async () => {
		const contact = await getTestContact();

		const result = await supertest(web).put(`/api/contacts/${contact.id}`).set('Authorization', 'test').send({
			first_name: '',
			last_name: '',
			email: 'vickygmail.com',
			phone: '',
		});

		logger.info(result.body);

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to update contact if contactId is not found', async () => {
		const contact = await getTestContact();

		const result = await supertest(web)
			.put(`/api/contacts/${contact.id + 1}`)
			.set('Authorization', 'test')
			.send({
				first_name: 'Vicky Pratama',
				last_name: 'Setia Mahardika',
				email: 'vicky@gmail.com',
				phone: '098989898989',
			});

		logger.info(result.body);

		expect(result.status).toBe(404);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to update contact if token is invalid', async () => {
		const contact = await getTestContact();

		const result = await supertest(web).put(`/api/contacts/${contact.id}`).set('Authorization', 'wrong').send({
			first_name: 'Vicky Pratama',
			last_name: 'Setia Mahardika',
			email: 'vicky@gmail.com',
			phone: '098989898989',
		});

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});

// DELETE CONTACT
describe('DELETE /api/contacts/:contactId', () => {
	beforeEach(async () => {
		await createTestUser();
		await createTestContact();
	});

	afterEach(async () => {
		await removeAllTestData();
	});

	it('should be able to delete contact', async () => {
		let contact = await getTestContact();
		const result = await supertest(web).delete(`/api/contacts/${contact.id}`).set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data).toBe('OK');

		contact = await getTestContact();
		expect(contact).toBeNull();
	});

	it('should reject to delete contact if contactId is not found', async () => {
		let contact = await getTestContact();
		const result = await supertest(web)
			.delete(`/api/contacts/${contact.id + 1}`)
			.set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(404);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to delete contact if token is invalid', async () => {
		let contact = await getTestContact();
		const result = await supertest(web).delete(`/api/contacts/${contact.id}`).set('Authorization', 'wrong');

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});

// SEARCH CONTACT
describe('GET /api/contacts', () => {
	beforeEach(async () => {
		await createTestUser();
		await createManyTestContact();
	});

	afterEach(async () => {
		await removeAllTestData();
	});

	it('should be able to search contact without parameter', async () => {
		const result = await supertest(web).get('/api/contacts').set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.length).toBe(10);
		expect(result.body.paging.page).toBe(1);
		expect(result.body.paging.total_page).toBe(2);
		expect(result.body.paging.total_item).toBe(15);
	});

	it('should be able to search contact using page', async () => {
		const result = await supertest(web)
			.get('/api/contacts')
			.query({
				page: 2,
			})
			.set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.length).toBe(5);
		expect(result.body.paging.page).toBe(2);
		expect(result.body.paging.total_page).toBe(2);
		expect(result.body.paging.total_item).toBe(15);
	});

	it('should be able to search contact using size', async () => {
		const result = await supertest(web)
			.get('/api/contacts')
			.query({
				size: 3,
			})
			.set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.length).toBe(3);
		expect(result.body.paging.page).toBe(1);
		expect(result.body.paging.total_page).toBe(5);
		expect(result.body.paging.total_item).toBe(15);
	});

	it('should be able to search contact using page and size', async () => {
		const result = await supertest(web)
			.get('/api/contacts')
			.query({
				page: 4,
				size: 4,
			})
			.set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.length).toBe(3);
		expect(result.body.paging.page).toBe(4);
		expect(result.body.paging.total_page).toBe(4);
		expect(result.body.paging.total_item).toBe(15);
	});

	it('should be able to search contact using name', async () => {
		const result = await supertest(web)
			.get('/api/contacts')
			.query({
				name: 'test 7',
			})
			.set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.length).toBe(1);
		expect(result.body.paging.page).toBe(1);
		expect(result.body.paging.total_page).toBe(1);
		expect(result.body.paging.total_item).toBe(1);
	});

	it('should be able to search contact using email', async () => {
		const result = await supertest(web)
			.get('/api/contacts')
			.query({
				email: 'test1@gmail.com',
			})
			.set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.length).toBe(1);
		expect(result.body.paging.page).toBe(1);
		expect(result.body.paging.total_page).toBe(1);
		expect(result.body.paging.total_item).toBe(1);
	});

	it('should be able to search contact using phone', async () => {
		const result = await supertest(web)
			.get('/api/contacts')
			.query({
				phone: '09876543211',
			})
			.set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.length).toBe(6);
		expect(result.body.paging.page).toBe(1);
		expect(result.body.paging.total_page).toBe(1);
		expect(result.body.paging.total_item).toBe(6);
	});

	it('should reject to search contact if token is invalid', async () => {
		const result = await supertest(web)
			.get('/api/contacts')
			.query({
				phone: '09876543211',
			})
			.set('Authorization', 'wrong');

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});
