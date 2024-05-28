import InvoicesUseCase from '@modules/invoices/InvoicesUseCase';
import InvoicesRepository from '@modules/invoices/InvoicesRepository';

jest.mock('@modules/invoices/InvoicesRepository');

describe('InvoicesUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all invoices with calculated data', async () => {
    
    const invoicesMock = [
      {
        numeroInstalacao: '123456',
        numeroCliente: '789012',
        mesReferencia: '01/2024',
        energiaEletricaKwh: 1000,
        energiaSCEEEKwh: 2000,
        energiaCompensadaGDIKwh: 3000,
        energiaEletricaValor: 123.45,
        energiaSCEEEValor: 234.56,
        contribIlumPublicaMunicipalValor: 456.78,
        energiaCompensadaGDIValor: -500.89
      },
    ];
    (InvoicesRepository.getAll as jest.Mock).mockResolvedValue(invoicesMock);
  
    const result = await InvoicesUseCase.getAllInvoices();
  

    expect(result).toEqual([
      {
        cliente: {
          numeroInstalacao: '123456',
          numeroCliente: '789012',
        },
        mesReferencia: '01/2024',
        consumoDeEnergia: 3000, 
        energiaCompensada: 3000,
        valorTotalSemGD: 123.45 + 234.56 + 456.78,
        economiaGD: -500.89, 
      },
    ]);
  

    expect(InvoicesRepository.getAll).toHaveBeenCalledTimes(1);
  });
  

  it('should throw an error if repository throws', async () => {
    
    (InvoicesRepository.getAll as jest.Mock).mockRejectedValue(new Error('Falha ao buscar faturas'));

    await expect(InvoicesUseCase.getAllInvoices()).rejects.toThrow('Falha ao buscar faturas');

    expect(InvoicesRepository.getAll).toHaveBeenCalledTimes(1);
  });
});
