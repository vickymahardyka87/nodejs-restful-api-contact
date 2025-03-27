import bcrypt from 'bcrypt';
import { ResponseError } from '../error/response-error';

export const comparePassword = async (password, hashedPassword) => {
	const isPasswordValid = await bcrypt.compare(password, hashedPassword);
	if (!isPasswordValid) throw new ResponseError(401, 'Invalid username or password');

	return isPasswordValid;
};
