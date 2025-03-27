import { prismaClient } from '../app/database.js';
import { ResponseError } from '../error/response-error.js';

export const checkCountUser = async (username) => {
	const totalUserInDatabase = await prismaClient.user.count({ where: { username } });
	if (totalUserInDatabase > 0) throw new ResponseError(400, 'Username already exists');
	return totalUserInDatabase;
};
