import { logger } from './app/logging.js';
import web from './app/web.js';

const port = process.env.PORT || 3000;

web.listen(port, () => {
	logger.info(`Server is running on port ${port}`);
});
