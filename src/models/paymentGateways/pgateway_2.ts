import { IOptions, IUser, IPaymentDetails, IResult } from '../../core/interfaces';
import { IPaymentGateway } from '../../core/IPaymentGateway';

export class pgateway_2 implements IPaymentGateway {
  setConfig(options: IOptions, user: IUser): void {
    throw new Error('Method not implemented.');
  }
  pay(payment: IPaymentDetails): IResult {
    throw new Error('Method not implemented.');
  }
  reimburse(payment: IPaymentDetails): IResult {
    throw new Error('Method not implemented.');
  }
  partialReimburse(payment: IPaymentDetails): IResult {
    throw new Error('Method not implemented.');
  }
}
