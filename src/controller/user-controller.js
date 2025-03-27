import { successResponse } from '../helper/response-success.js';
import userService from '../service/user-service.js';

const getParams = (req) => ({
	username: req.user.username,
	request: req.body,
});

const register = async (req, res, next) => {
	try {
		const result = await userService.register(req.body);
		successResponse(res.status(201), result);
	} catch (err) {
		next(err);
	}
};

const login = async (req, res, next) => {
	try {
		const result = await userService.login(req.body);
		successResponse(res.status(200), result);
	} catch (err) {
		next(err);
	}
};

const get = async (req, res, next) => {
	try {
		const { username } = getParams(req);
		const result = await userService.get(username);
		successResponse(res.status(200), result);
	} catch (err) {
		next(err);
	}
};

const update = async (req, res, next) => {
	try {
		const { username, request } = getParams(req);
		request.username = username;
		const result = await userService.update(request);
		successResponse(res.status(200), result);
	} catch (err) {
		next(err);
	}
};

const logout = async (req, res, next) => {
	try {
		const { username } = getParams(req);
		await userService.logout(username);
		successResponse(res.status(200), 'OK');
	} catch (err) {
		next(err);
	}
};

export default { register, login, get, update, logout };
