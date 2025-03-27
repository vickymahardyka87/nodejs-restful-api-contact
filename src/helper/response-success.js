export const successResponse = (response, data, paging = null) => {
	const result = { data };

	if (paging) {
		result.paging = paging;
	}

	return response.json(result);
};
