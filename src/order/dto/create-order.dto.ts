
import { Etat, ModePayment } from "../../schemas/order.schemas"

export class CreateOrderDto {

  user: string; 

  livreur: string; 

  etat: Etat;

  typePayment: ModePayment;

  prix: Number;
  
}
