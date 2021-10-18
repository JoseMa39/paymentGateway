import { IUser } from "./IUser";

export interface IPaymentDetails {
  amount: number;
  from: string|IUser;
  to: string|IUser;
}
