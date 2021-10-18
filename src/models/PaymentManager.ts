import { IPaymentDetails, IResult } from '../core/interfaces';
import { IPaymentGateway } from '../core/IPaymentGateway';
import { IPaymentManager } from '../core/IPaymentManager';

export class PaymentManager implements IPaymentManager {
  pay(payment: IPaymentDetails, paymentGateway: IPaymentGateway): IResult {
    //some preprocess
    let result: IResult = paymentGateway.pay(payment);
    //some posprocess (maybe save payment info in db)
    return result;
  }
  reimburse(payment: IPaymentDetails, paymentGateway: IPaymentGateway): IResult {
    //some preprocess
    let result: IResult = paymentGateway.reimburse(payment);
    //some posprocess (maybe save payment info in db)
    return result;
  }
}
