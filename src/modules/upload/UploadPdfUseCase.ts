import pdfParse from 'pdf-parse';
import { promises as fs } from 'fs';
import UploadPdfRepository from '@/modules/upload/UploadPdfRepository';
import urlImage from '@/shared/urlImage';

class UploadPdfUseCase {
  async execute(file: Express.Multer.File) {
    try {
      const data = await this.pdfToObject(file)
      
      const customer = await UploadPdfRepository.verifyCustomerToUpload({ numeroCliente: data.numeroCliente, numeroInstalacao: data.numeroInstalacao })
      if(!customer){
        await UploadPdfRepository.createCustomer({
          newCustomer: {
            nome: data.nomeCliente,
            numeroCliente: data.numeroCliente,
            numeroInstalacao: data.numeroInstalacao
          }
        })
      }
      await UploadPdfRepository.upload({
        fatura: {
          contribIlumPublicaMunicipalValor: data.contribIlumPublicaMunicipalValor,
          energiaCompensadaGDIKwh: data.energiaCompensadaGDIKwh,
          energiaCompensadaGDIValor: data.energiaCompensadaGDIValor,
          energiaEletricaKwh: data.energiaEletricaKwh,
          energiaEletricaValor: data.energiaEletricaValor,
          energiaSCEEEKwh: data.energiaSCEEEKwh,
          energiaSCEEEValor: data.energiaSCEEEValor,
          mesReferencia: data.mesReferencia,
          numeroCliente: data.numeroCliente,
          numeroInstalacao: data.numeroInstalacao,
          valorFatura: data.valorFatura,
          urlImage: urlImage + '/'+ file.filename
        }
      })

      console.log({customer, data});
    } catch (error) {
      process.env.NODE_ENV == "development" && console.error(error);
      
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      }
    }
  }

  private extractPdfData = (pdfData: pdfParse.Result) => {
    const { text } = pdfData;
    const data = {
      nomeCliente: '',
      numeroCliente: '',
      numeroInstalacao: '',
      mesReferencia: '',
      vencimento: '',
      valorFatura: 0,
      energiaEletricaKwh: 0,
      energiaEletricaValor: 0,
      energiaSCEEEKwh: 0,
      energiaSCEEEValor: 0,
      energiaCompensadaGDIKwh: 0,
      energiaCompensadaGDIValor: 0,
      contribIlumPublicaMunicipalValor: 0,
    };

    const nomeClienteRegex = /Comprovante de Pagamento\n([\s\S]*?)\n/;
    const numeroClienteRegex = /Nº DA INSTALAÇÃO\s+(\d+)/;
    const numeroInstalacaoRegex = /Nº DA INSTALAÇÃO\s+(\d+)\s+(\d+)/;
    const mesReferenciaRegex = /\s+(\w+\/\d{4})/;
    const vencimentoRegex = /\s+(\d{2}\/\d{2}\/\d{4})\s+/;
    const valorAPagarRegex = /TOTAL\s+(\d+,\d{2})/;
    const energiaEletricaKwhRegex = /Energia ElétricakWh\s+(\d+)/;
    const energiaEletricaValorRegex = /Energia ElétricakWh\s+\d+\s+[\d,.]+\s+([\d,.]+)/;
    const energiaSCEEEKwhRegex = /Energia SCEE ISENTAkWh\s+(\d+)/;
    const energiaSCEEEValorRegex = /Energia SCEE ISENTAkWh\s+\d+\s+[\d,.]+\s+([\d,.]+)/;
    const energiaCompensadaGDIKwhRegex = /Energia compensada GD IkWh\s+(\d+)/;
    const energiaCompensadaGDIValorRegex = /Energia compensada GD IkWh\s+\d+\s+[\d,.]+\s+(-[\d,.]+)/;
    const contribIlumPublicaMunicipalValorRegex = /Contrib Ilum Publica Municipal\s+([\d,.]+)/;

    const matchNomeCliente = text.match(nomeClienteRegex);
    const matchNumeroCliente = pdfData.text.match(numeroClienteRegex);
    const matchNumeroInstalacao = pdfData.text.match(numeroInstalacaoRegex);
    const matchMesReferencia = text.match(mesReferenciaRegex);
    const matchVencimento = text.match(vencimentoRegex);
    const matchValorAPagar = text.match(valorAPagarRegex);
    const matchEnergiaEletricaKwh = text.match(energiaEletricaKwhRegex);
    const matchEnergiaEletricaValor = text.match(energiaEletricaValorRegex);
    const matchEnergiaSCEEEKwh = text.match(energiaSCEEEKwhRegex);
    const matchEnergiaSCEEEValor = text.match(energiaSCEEEValorRegex);
    const matchEnergiaCompensadaGDIKwh = text.match(energiaCompensadaGDIKwhRegex);
    const matchEnergiaCompensadaGDIValor = text.match(energiaCompensadaGDIValorRegex);
    const matchContribIlumPublicaMunicipalValor = text.match(contribIlumPublicaMunicipalValorRegex);


    if (matchNomeCliente) data.nomeCliente = matchNomeCliente[1].trim();
    if (matchNumeroCliente) data.numeroCliente = matchNumeroCliente[1];
    if (matchNumeroInstalacao) data.numeroInstalacao = matchNumeroInstalacao[2];
    if (matchMesReferencia) data.mesReferencia = matchMesReferencia[1];
    if (matchVencimento) data.vencimento = matchVencimento[1];
    if (matchValorAPagar) data.valorFatura = parseFloat(matchValorAPagar[1].replace(',', '.'));
    if (matchEnergiaEletricaKwh) data.energiaEletricaKwh = parseFloat(matchEnergiaEletricaKwh[1].replace(',', '.'));
    if (matchEnergiaEletricaValor) data.energiaEletricaValor = parseFloat(matchEnergiaEletricaValor[1].replace(',', '.'));
    if (matchEnergiaSCEEEKwh) data.energiaSCEEEKwh = parseFloat(matchEnergiaSCEEEKwh[1].replace(',', '.'));
    if (matchEnergiaSCEEEValor) data.energiaSCEEEValor = parseFloat(matchEnergiaSCEEEValor[1].replace(',', '.'));
    if (matchEnergiaCompensadaGDIKwh) data.energiaCompensadaGDIKwh = parseFloat(matchEnergiaCompensadaGDIKwh[1].replace(',', '.'));
    if (matchEnergiaCompensadaGDIValor) data.energiaCompensadaGDIValor = parseFloat(matchEnergiaCompensadaGDIValor[1].replace(',', '.'));
    if (matchContribIlumPublicaMunicipalValor) data.contribIlumPublicaMunicipalValor = parseFloat(matchContribIlumPublicaMunicipalValor[1].replace(',', '.'));

    return data;
  };

  private async pdfToObject(file: Express.Multer.File){
    const dataBuffer = await fs.readFile(file.path);
    const pdfData = await pdfParse(dataBuffer);

    return this.extractPdfData(pdfData);
  }

}

export default new UploadPdfUseCase();
