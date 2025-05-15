import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model.js'

const generatedAccessToken = async(userId)=>{
    const token = await jwt.sign({id:userId},
        process.env.SECRET_KEY_ACCESS_TOKEN,
        {expiresIn: '5h'}
    )                                  
    
    const updateGeneratedTokenUser = await UserModel.updateOne(
            {_id : userId},
            {
                access_token : token
            }
        )

    return token
}

export default generatedAccessToken