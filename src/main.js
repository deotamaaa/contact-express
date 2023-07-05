import { logger } from "./application/logging.js";
import { web } from "./application/web.js";

web.listen(300, () => {
  logger.info("Server is running on port 300");
});
