import { IPaymentDetails, IResult } from './interfaces';
import { IPaymentGateway } from './IPaymentGateway';

export interface IPaymentManager {
  //proxy pattern implementation

  /**
   * Ejecuta un pago
   * @param payment detalles del pago a realizar
   * @param paymentGateway pasarela de pago por donde se realizará el pago
   * @returns resultado del pago
   */
  pay(payment: IPaymentDetails, paymentGateway: IPaymentGateway): IResult;

  /**
   * Ejecuta un reembolso
   * @param payment detalles del reembolso a realizar
   * @param paymentGateway pasarela de pago por donde se realizará el reembolso
   * @returns resultado del reembolso
   */
  reimburse(payment: IPaymentDetails, paymentGateway: IPaymentGateway): IResult;
}
