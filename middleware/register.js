import { db } from "../DB/connectMongo.js";

export async function register(req, res, next) {
    if (req.body && req.body.username && req.body.password && Object.keys(req.body).length === 2){
        const {username, password} = req.body
        if (typeof username === "string" && typeof password === "string"){
            const user = await db.collection("users").find({username: {$eq: username}}).toArray()
            if (user.length === 0){
                next()
                return
            } else {
                return res.status(400).send(`username [${username}] is exist.`)
            }
        } 
    }
    res.status(400).send("missind data")
}