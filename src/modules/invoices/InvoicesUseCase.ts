import InvoicesRepository from "@modules/invoices/InvoicesRepository";

class InvoicesUseCase {
  async getAllInvoices() {
    try {
      const invoices = await InvoicesRepository.getAll();

      const data = invoices.map(invoice => {
        return {
          cliente: {
            numeroInstalacao: invoice.numeroInstalacao,
            numeroCliente: invoice.numeroCliente,
          },
          mesReferencia: invoice.mesReferencia,
          consumoDeEnergia: invoice.energiaEletricaKwh + invoice.energiaSCEEEKwh,
          energiaCompensada: invoice.energiaCompensadaGDIKwh,
          valorTotalSemGD: invoice.energiaEletricaValor + invoice.energiaSCEEEValor + invoice.contribIlumPublicaMunicipalValor,
          economiaGD: invoice.energiaCompensadaGDIValor
        }
      })

      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      }
    }

  }
}

export default new InvoicesUseCase();