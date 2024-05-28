import { Cliente, Fatura, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UploadPdfRepository {
  async upload({ fatura } : { fatura: Omit<Fatura, 'id'> }){
    try {
      const existingFatura = await prisma.fatura.findFirst({
        where: {
          numeroCliente: fatura.numeroCliente,
          numeroInstalacao: fatura.numeroInstalacao,
          mesReferencia: fatura.mesReferencia,
        }
      });
  
      if (existingFatura) {
        throw new Error('Fatura com o mesmo mês de referencia já existe');
      }
      const uploadFatura = prisma.fatura.create({
        data: {
          ...fatura
        }
      })
      return uploadFatura;
    }catch(error) {
      if(error instanceof Error ){
        throw new Error(`${error.message}`);
      }
      throw new Error('Error no upload da fatura');
    } finally {
      await prisma.$disconnect()
    }

  }

  async verifyCustomerToUpload({ numeroCliente, numeroInstalacao } : { numeroCliente: string, numeroInstalacao: string }){
    try {
      const customer = prisma.cliente.findUnique({
        where: {
          numeroCliente_numeroInstalacao: {
            numeroCliente,
            numeroInstalacao
          }
        }
      })

      return customer;
    } catch (error){
      throw new Error('Erro ao verificar cliente')
    } finally {
      await prisma.$disconnect();
    }


  }

  async createCustomer({ newCustomer } : { newCustomer: Omit<Cliente, 'id'> }){
    try {
      const customer = await prisma.cliente.create({
        data: {
          nome: newCustomer.nome,
          numeroCliente: newCustomer.numeroCliente,
          numeroInstalacao: newCustomer.numeroInstalacao
        },
      })
  
      return customer;
    }catch {
      throw new Error('Erro ao criar cliente')
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new UploadPdfRepository();