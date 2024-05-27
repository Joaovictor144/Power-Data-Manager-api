import { Router } from "express";
import { fileRoutes } from "@infra/routes/fileRoutes";

const routes = Router();

routes.use(fileRoutes);


export { routes }