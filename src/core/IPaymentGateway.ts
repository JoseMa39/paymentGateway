import { IResult, IOptions, IUser, IPaymentDetails } from './interfaces';

export interface IPaymentGateway {
  /**
   * Actualiza la configuración de la pasarela de pago para un usuario
   * @param options nueva configuración de la pasarela de pago
   * @param user usuario al que se le cambiará la configuración
   */
  setConfig(options: IOptions, user: IUser): void;


  /**
   * Ejecuta un pago
   * @param payment detalles del pago a realizar
   * @returns resultado del pago
   */
  pay(payment: IPaymentDetails): IResult;

  /**
   * Ejecuta un reembolso
   * @param payment detalles del reembolso a realizar
   * @returns resultado del reembolso
   */
  reimburse(payment: IPaymentDetails): IResult;
}
