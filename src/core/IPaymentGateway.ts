import { IResult, IOptions, IUser, IPaymentDetails } from './interfaces';

export interface IPaymentGateway {
  setConfig(options: IOptions, user: IUser): void;
  pay(payment: IPaymentDetails): IResult;
  raimburse(payment: IPaymentDetails): IResult;
}
