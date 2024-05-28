import InvoicesController from "@/modules/invoices/InvoicesController";
import { Router } from "express";

const invoicesRoutes = Router();

invoicesRoutes.get("/invoice", InvoicesController.execute)


export { invoicesRoutes }