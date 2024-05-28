import { Fatura, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class InvoicesRepository {
  async getAll(): Promise<Fatura[]>{
    try {
      const invoices = await prisma.fatura.findMany();

      return invoices
    }catch(error){
      if(error instanceof Error ){
        throw new Error("Não foi possível buscar faturas");
      }
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new InvoicesRepository();