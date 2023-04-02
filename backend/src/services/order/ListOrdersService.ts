import prismaClient from "../../prisma";

class ListOrdersService{
    async execute(){
        const orders = prismaClient.order.findMany({
            where:{
                draft: false,
                status: false
            }
        })
        return orders;
    }
}
export {ListOrdersService};