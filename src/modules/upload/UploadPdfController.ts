import { Request, Response } from "express";
import UploadPdfUseCase from "@modules/upload/UploadPdfUseCase";

class UploadPdfController {
  async handle(request: Request, response: Response) {
    try {
      const { file } = request;

      await UploadPdfUseCase.execute(file as Express.Multer.File);

      response.status(200).json({message: "upload executado"})
    } catch (error) {
      if (error instanceof Error){
        console.log({locale: "controller" , error: error.message})
        response.status(400).json({ error: error.message })
      }
      
    }

  }
}


export default new UploadPdfController();