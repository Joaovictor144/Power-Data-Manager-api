import { Request, Response } from "express";
import InvoicesUseCase from "@modules/invoices/InvoicesUseCase";

class InvoicesController {
  async execute(request: Request, response: Response){
    try {
      const data = await InvoicesUseCase.getAllInvoices();

      response.status(200).json(data);
    } catch (error) {
      if (error instanceof Error){
        console.log({locale: "controller" , error: error.message})
        response.status(400).json({ error: error.message })
      }
      
    }
  }
}

export default new InvoicesController();