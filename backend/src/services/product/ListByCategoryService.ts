import prismaClient from "../../prisma";

interface ProductRequest{
    category_id: string;
}

class ListByCategoryService{
    async execute({category_id}: ProductRequest){

        var products = prismaClient.product.findMany({
            where:{
                category_id: category_id,
            },
            select:{
                id: true,
                name: true,
                price: true,
                description: true,
                banner: true,
                category_id: true,
            }
        })
        return products;
    }
}

export {ListByCategoryService};