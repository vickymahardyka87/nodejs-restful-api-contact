import { createContactValidation, getContactValidation, searchContactValidation, updateContactValidation } from '../validation/contact-validation.js';
import { validate } from '../validation/validation.js';
import { prismaClient } from '../app/database.js';
import { ResponseError } from '../error/response-error.js';
import { checkCountContact } from '../helper/check-count-contact.js';

const CONTACT_SELECT_FIELDS = {
	id: true,
	first_name: true,
	last_name: true,
	email: true,
	phone: true,
};

const create = async (user, request) => {
	const createRequest = validate(createContactValidation, request);
	createRequest.username = user.username;

	return prismaClient.contact.create({
		data: createRequest,
		select: CONTACT_SELECT_FIELDS,
	});
};

const get = async (user, contactId) => {
	contactId = validate(getContactValidation, contactId);
	const contact = await prismaClient.contact.findFirst({
		where: {
			username: user.username,
			id: contactId,
		},
		select: CONTACT_SELECT_FIELDS,
	});

	if (!contact) throw new ResponseError(404, 'Contact is not found');

	return contact;
};

const update = async (user, request) => {
	const updateRequest = validate(updateContactValidation, request);
	await checkCountContact(user.username, updateRequest.id);

	return prismaClient.contact.update({
		where: { id: updateRequest.id },
		data: updateRequest,
		select: CONTACT_SELECT_FIELDS,
	});
};

const remove = async (user, contactId) => {
	contactId = validate(getContactValidation, contactId);
	await checkCountContact(user.username, contactId);

	return prismaClient.contact.delete({
		where: { id: contactId },
	});
};

const search = async (user, request) => {
	request = validate(searchContactValidation, request);

	const skip = (request.page - 1) * request.size;
	const filters = [];

	filters.push({
		username: user.username,
	});

	if (request.name) {
		filters.push({
			OR: [{ first_name: { contains: request.name } }, { last_name: { contains: request.name } }],
		});
	}

	if (request.email) filters.push({ email: { contains: request.email } });
	if (request.phone) filters.push({ phone: { contains: request.phone } });

	const contacts = await prismaClient.contact.findMany({
		where: { AND: filters },
		take: request.size,
		skip,
	});

	const totalItems = await prismaClient.contact.count({
		where: { AND: filters },
	});

	return {
		data: contacts,
		paging: {
			page: request.page,
			total_item: totalItems,
			total_page: Math.ceil(totalItems / request.size),
		},
	};
};

export default { create, get, update, remove, search };
