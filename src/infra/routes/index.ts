import { Router } from "express";
import { fileRoutes } from "@infra/routes/fileRoutes";
import { invoicesRoutes } from "@/infra/routes/invoicesRoutes";
import { auth } from "@infra/middleware/auth";

const routes = Router();

routes.use(auth);

routes.use(fileRoutes);
routes.use(invoicesRoutes);


export { routes }