import supertest from 'supertest';
import web from '../src/app/web.js';
import { logger } from '../src/app/logging.js';
import { createAllTestData, getTestUser, removeAllTestData } from './test-utils.js';
import bcrypt from 'bcrypt';

// REGISTER USER
describe('POST /api/users/register', () => {
	afterEach(async () => {
		await removeAllTestData();
	});

	it('should be able to register new user', async () => {
		const result = await supertest(web).post('/api/users/register').send({
			username: 'test',
			password: 'rahasia',
			name: 'test',
		});

		logger.info(result.body);

		expect(result.status).toBe(201);
		expect(result.body.data.username).toBe('test');
		expect(result.body.data.name).toBe('test');
		expect(result.body.data.password).toBeUndefined();
	});

	it('should reject to register if request is invalid', async () => {
		const result = await supertest(web).post('/api/users/register').send({
			username: '',
			password: '',
			name: '',
		});

		logger.info(result.body);

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to register if username already exist', async () => {
		let result = await supertest(web).post('/api/users/register').send({
			username: 'test',
			password: 'rahasia',
			name: 'test',
		});

		logger.info(result.body);

		expect(result.status).toBe(201);
		expect(result.body.data.username).toBe('test');
		expect(result.body.data.name).toBe('test');
		expect(result.body.data.password).toBeUndefined();

		result = await supertest(web).post('/api/users/register').send({
			username: 'test',
			password: 'rahasia',
			name: 'test',
		});

		logger.info(result.body);

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});
});

// LOGIN USER
describe('POST /api/users/login', () => {
	beforeEach(async () => {
		await createAllTestData();
	});

	afterEach(async () => {
		await removeAllTestData();
	});

	it('should be able to login user', async () => {
		const result = await supertest(web).post('/api/users/login').send({
			username: 'test',
			password: 'rahasia',
		});

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.token).toBeDefined();
		expect(result.body.data.token).not.toBe('tests');
	});

	it('should reject to login if request is invalid', async () => {
		const result = await supertest(web).post('/api/users/login').send({
			username: '',
			password: '',
		});

		logger.info(result.body);

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to login if password is wrong', async () => {
		const result = await supertest(web).post('/api/users/login').send({
			username: 'test',
			password: 'wrong',
		});

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to login if username is wrong', async () => {
		const result = await supertest(web).post('/api/users/login').send({
			username: 'wrong',
			password: 'wrong',
		});

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});

// GET USER
describe('GET /api/users/current', () => {
	beforeEach(async () => {
		await createAllTestData();
	});

	afterEach(async () => {
		await removeAllTestData();
	});

	it('should be able to get current user', async () => {
		const result = await supertest(web).get('/api/users/current').set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe('test');
		expect(result.body.data.name).toBe('test');
	});

	it('should reject to get current user if token is invalid', async () => {
		const result = await supertest(web).get('/api/users/current').set('Authorization', 'wrong');

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});

// UPDATE USER
describe('PATCH /api/users/current', () => {
	beforeEach(async () => {
		await createAllTestData();
	});

	afterEach(async () => {
		await removeAllTestData();
	});

	it('should be able to update user', async () => {
		const result = await supertest(web).patch('/api/users/current').set('Authorization', 'test').send({
			name: 'testupdated',
			password: 'rahasiaupdated',
		});

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.name).toBe('testupdated');
		expect(result.body.data.username).toBe('test');

		const user = await getTestUser();
		expect(await bcrypt.compare('rahasiaupdated', user.password)).toBe(true);
	});

	it('should be able to update only name', async () => {
		const result = await supertest(web).patch('/api/users/current').set('Authorization', 'test').send({
			name: 'testupdated',
		});

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.name).toBe('testupdated');
		expect(result.body.data.username).toBe('test');
	});

	it('should be able to update only password', async () => {
		const result = await supertest(web).patch('/api/users/current').set('Authorization', 'test').send({
			password: 'rahasiaupdated',
		});

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe('test');
		expect(result.body.data.name).toBe('test');

		const user = await getTestUser();
		expect(await bcrypt.compare('rahasiaupdated', user.password)).toBe(true);
	});

	it('should reject to update if request is invalid', async () => {
		const result = await supertest(web).patch('/api/users/current').set('Authorization', 'wrong').send({});

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject to update user if token is invalid', async () => {
		const result = await supertest(web).patch('/api/users/current').set('Authorization', 'wrong').send({
			name: 'testupdated',
			password: 'rahasiaupdated',
		});

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});

// DELETE USER
describe('DELETE /api/users/logout', () => {
	beforeEach(async () => {
		await createAllTestData();
	});

	afterEach(async () => {
		await removeAllTestData();
	});
	it('should be able to logout user', async () => {
		const result = await supertest(web).delete('/api/users/logout').set('Authorization', 'test');

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data).toBe('OK');

		const user = await getTestUser();
		expect(user.token).toBeNull();
	});

	it('should reject to logout user if token is invalid', async () => {
		const result = await supertest(web).delete('/api/users/logout').set('Authorization', 'wrong');

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});
