import { prismaClient } from '../app/database.js';
import { ResponseError } from '../error/response-error.js';
import { getContactValidation } from '../validation/contact-validation.js';
import { validate } from '../validation/validation.js';

export const checkContactMustExists = async (user, contactId) => {
	contactId = validate(getContactValidation, contactId);

	const isContactExists = await prismaClient.contact.findUnique({
		where: { username: user.username, id: contactId },
	});

	if (!isContactExists) throw new ResponseError(404, 'Contact is not found');

	return contactId;
};
