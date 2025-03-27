import { getUserValidation, loginUserValidation, registerUservalidation, updateUserValidation } from '../validation/user-validation.js';
import { validate } from '../validation/validation.js';
import { prismaClient } from '../app/database.js';
import { ResponseError } from '../error/response-error.js';
import { hashPassword } from '../helper/hash-password.js';
import { checkUserExists } from '../helper/check-user-exists.js';
import { comparePassword } from '../helper/compare-password.js';
import { checkCountUser } from '../helper/check-count-user.js';
import { v4 as uuid } from 'uuid';

const USER_SELECT_FIELDS = {
	username: true,
	name: true,
};

const register = async (request) => {
	const registerRequest = validate(registerUservalidation, request);
	await checkCountUser(registerRequest.username);

	registerRequest.password = await hashPassword(registerRequest.password);

	return prismaClient.user.create({
		data: registerRequest,
		select: USER_SELECT_FIELDS,
	});
};

const login = async (request) => {
	const loginRequest = validate(loginUserValidation, request);

	const user = await prismaClient.user.findUnique({
		where: { username: loginRequest.username },
		select: {
			username: true,
			password: true,
		},
	});

	if (!user) throw new ResponseError(401, 'Invalid username or password');
	await comparePassword(loginRequest.password, user.password);

	const token = uuid().toString();

	return prismaClient.user.update({
		where: { username: user.username },
		data: { token },
		select: { token: true },
	});
};

const get = async (username) => {
	username = validate(getUserValidation, username);
	return checkUserExists(username);
};

const update = async (request) => {
	const updateRequest = validate(updateUserValidation, request);
	await checkUserExists(updateRequest.username);

	const data = {};
	if (updateRequest.name) data.name = updateRequest.name;
	if (updateRequest.password) data.password = await hashPassword(updateRequest.password);

	return prismaClient.user.update({
		where: { username: updateRequest.username },
		data,
		select: USER_SELECT_FIELDS,
	});
};

const logout = async (username) => {
	username = validate(getUserValidation, username);
	await checkUserExists(username);

	return prismaClient.user.update({
		where: { username },
		data: { token: null },
		select: USER_SELECT_FIELDS,
	});
};

export default { register, login, get, update, logout };
