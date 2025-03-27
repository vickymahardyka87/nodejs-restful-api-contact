import { validate } from '../validation/validation.js';
import { prismaClient } from '../app/database.js';
import { createAddressValidation, updateAddressValidation } from '../validation/address-validation.js';
import { checkContactMustExists } from '../helper/check-contact-exists.js';
import { checkAddressMustExists } from '../helper/check-address-exists.js';

const ADDRESS_SELECT_FIELDS = {
	id: true,
	street: true,
	city: true,
	province: true,
	country: true,
	postal_code: true,
};

const create = async (user, contactId, request) => {
	contactId = await checkContactMustExists(user, contactId);
	const address = validate(createAddressValidation, request);
	address.contact_id = contactId;

	return await prismaClient.address.create({
		data: address,
		select: ADDRESS_SELECT_FIELDS,
	});
};

const get = async (user, contactId, addressId) => {
	contactId = await checkContactMustExists(user, contactId);
	addressId = await checkAddressMustExists(contactId, addressId);

	return prismaClient.address.findFirst({
		where: { contact_id: contactId, id: addressId },
		select: ADDRESS_SELECT_FIELDS,
	});
};

const update = async (user, contactId, request) => {
	contactId = await checkContactMustExists(user, contactId);
	const address = validate(updateAddressValidation, request);
	await checkAddressMustExists(contactId, address.id);

	return prismaClient.address.update({
		where: { id: address.id },
		data: address,
		select: ADDRESS_SELECT_FIELDS,
	});
};

const remove = async (user, contactId, addressId) => {
	contactId = await checkContactMustExists(user, contactId);
	addressId = await checkAddressMustExists(contactId, addressId);

	return prismaClient.address.delete({
		where: { id: addressId },
	});
};

const list = async (user, contactId) => {
	contactId = await checkContactMustExists(user, contactId);

	return prismaClient.address.findMany({
		where: { contact_id: contactId },
		select: ADDRESS_SELECT_FIELDS,
	});
};

export default { create, get, update, remove, list };
