
import { Etat, ModePayment,EtatPayment } from "../../schemas/order.schemas"

export class CreateOrderDto {

  user: string; 

  livreur: string; 

  etat: Etat;

  payment: EtatPayment;

  typePayment: ModePayment;

  prix: Number;
  
}
