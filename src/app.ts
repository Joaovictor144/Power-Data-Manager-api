import { server } from "@infra/server";
import pino from "pino";

const logger = pino();

const port = process.env.PORT || 3333;

server.listen(port, () => logger.info(`Power Data Manager running on port: ${port}`));