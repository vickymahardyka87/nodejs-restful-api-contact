import { prismaClient } from '../app/database.js';
import { ResponseError } from '../error/response-error.js';
import { getAddressValidation } from '../validation/address-validation.js';
import { validate } from '../validation/validation.js';

export const checkAddressMustExists = async (contactId, addressId) => {
	addressId = validate(getAddressValidation, addressId);

	const isAddressExists = await prismaClient.address.findUnique({
		where: { contact_id: contactId, id: addressId },
	});

	if (!isAddressExists) throw new ResponseError(404, 'Address is not found');

	return addressId;
};
