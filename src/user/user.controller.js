'use strict' //Modo estricto

import User from './user.model.js'
import {    encrypt,   checkPassword,  checkUpdate  } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        let user = new User(data)
        await user.save()
        return res.send({message: `Registration completed successfully; you can now log in using your username. ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'User registration failed', err: err})
    }
}

export const login = async (req, res) => {
    try {
        let data = req.body;
        let user = await User.findOne({ $or: [{ username: data.username }, { email: data.email }] });
        if (user && await checkPassword(data.password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                email: user.email
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${loggedUser.username}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(401).send({ message: 'Invalid credentials provided' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Login attempt failed' });
    }
};