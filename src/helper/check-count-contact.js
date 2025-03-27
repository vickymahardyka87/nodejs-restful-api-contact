import { prismaClient } from '../app/database.js';
import { ResponseError } from '../error/response-error.js';

export const checkCountContact = async (username, id) => {
	const totalContactInDatabase = await prismaClient.contact.count({ where: { username, id } });
	if (totalContactInDatabase !== 1) throw new ResponseError(404, 'Contact is not found');
	return totalContactInDatabase;
};
