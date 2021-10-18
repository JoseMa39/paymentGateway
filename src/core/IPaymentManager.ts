import { IPaymentDetails, IResult } from "./interfaces";
import { IPaymentGateway } from "./IPaymentGateway";

export interface IPaymentManager {    //proxy pattern implementation
  pay(payment: IPaymentDetails, paymentGateway: IPaymentGateway): IResult;
  raimburse(payment: IPaymentDetails, paymentGateway: IPaymentGateway): IResult;
}
