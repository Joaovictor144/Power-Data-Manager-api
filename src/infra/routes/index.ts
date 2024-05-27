import { Router } from "express";
import { fileRoutes } from "@infra/routes/fileRoutes";
import { auth } from "@infra/middleware/auth";

const routes = Router();

routes.use(auth);

routes.use(fileRoutes);


export { routes }