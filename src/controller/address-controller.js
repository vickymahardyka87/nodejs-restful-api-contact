import { successResponse } from '../helper/response-success.js';
import addressService from '../service/address-service.js';

const getParams = (req) => ({
	user: req.user,
	contactId: req.params.contactId,
	addressId: req.params.addressId,
	request: req.body,
});

const create = async (req, res, next) => {
	try {
		const { user, contactId, request } = getParams(req);
		const result = await addressService.create(user, contactId, request);
		successResponse(res.status(201), result);
	} catch (err) {
		next(err);
	}
};

const get = async (req, res, next) => {
	try {
		const { user, contactId, addressId } = getParams(req);
		const result = await addressService.get(user, contactId, addressId);
		successResponse(res.status(200), result);
	} catch (err) {
		next(err);
	}
};

const update = async (req, res, next) => {
	try {
		const { user, contactId, addressId, request } = getParams(req);
		request.id = addressId;
		const result = await addressService.update(user, contactId, request);
		successResponse(res.status(200), result);
	} catch (err) {
		next(err);
	}
};

const remove = async (req, res, next) => {
	try {
		const { user, contactId, addressId } = getParams(req);
		await addressService.remove(user, contactId, addressId);
		successResponse(res.status(200), 'OK');
	} catch (err) {
		next(err);
	}
};

const list = async (req, res, next) => {
	try {
		const { user, contactId } = getParams(req);
		const result = await addressService.list(user, contactId);
		successResponse(res.status(200), result);
	} catch (err) {
		next(err);
	}
};

export default { create, get, update, remove, list };
