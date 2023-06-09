import { Request, Response } from "express";
import { AddItemService } from "../../../services/order/item/AddItemService";

class AddItemController{
    async handle(req: Request, res: Response){
        const {order_id, product_id, amount} = req.body;
        const addItemService = new AddItemService();

        const orderItem = await addItemService.execute({
            order_id: order_id,
            product_id: product_id,
            amount: amount,
        })
        return res.json(orderItem);
    }
}
export {AddItemController};