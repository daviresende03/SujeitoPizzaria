import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface authRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: authRequest){
        const user = await prismaClient.user.findFirst({
            where:{
                email: email,
            }
        })
        if(!user){
            throw new Error('Incorrect User/Password.')
        }

        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            throw new Error('Incorrect User/Password.')
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token,
        };
    }
}

export {AuthUserService}