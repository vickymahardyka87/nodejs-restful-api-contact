import { successResponse } from '../helper/response-success.js';
import contactService from '../service/contact-service.js';

const getParams = (req) => ({
	user: req.user,
	contactId: req.params.contactId,
	request: req.body,
});

const create = async (req, res, next) => {
	try {
		const { user, request } = getParams(req);
		const result = await contactService.create(user, request);
		successResponse(res.status(201), result);
	} catch (err) {
		next(err);
	}
};

const get = async (req, res, next) => {
	try {
		const { user, contactId } = getParams(req);
		const result = await contactService.get(user, contactId);
		successResponse(res.status(200), result);
	} catch (err) {
		next(err);
	}
};

const update = async (req, res, next) => {
	try {
		const { user, contactId, request } = getParams(req);
		request.id = contactId;
		const result = await contactService.update(user, request);
		successResponse(res.status(200), result);
	} catch (err) {
		next(err);
	}
};

const remove = async (req, res, next) => {
	try {
		const { user, contactId } = getParams(req);
		await contactService.remove(user, contactId);
		successResponse(res.status(200), 'OK');
	} catch (err) {
		next(err);
	}
};

const search = async (req, res, next) => {
	try {
		const { user } = getParams(req);
		const request = {
			name: req.query.name,
			email: req.query.email,
			phone: req.query.phone,
			page: req.query.page,
			size: req.query.size,
		};
		const result = await contactService.search(user, request);
		successResponse(res.status(200), result.data, result.paging);
	} catch (err) {
		next(err);
	}
};

export default { create, get, update, remove, search };
