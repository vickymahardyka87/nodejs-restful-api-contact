import { prismaClient } from '../app/database.js';
import { ResponseError } from '../error/response-error.js';

export const checkUserExists = async (username) => {
	const isUserExists = await prismaClient.user.findUnique({ where: { username } });
	if (!isUserExists) throw new ResponseError(404, 'User not found');
	return isUserExists;
};
