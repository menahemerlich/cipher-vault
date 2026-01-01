import { db } from "../DB/connectMongo.js";

export async function authentication(req, res, next) {
    if (req.headers && req.headers.username && req.headers.password){
        const {username, password} = req.headers
        const user = await db.collection("users").find({$and: [{username: {$eq: username}}, {password: {$eq: password}}]}).toArray()
        if (user.length > 0){
            next()
        } else {
            res.status(404).send(`Access blocked.`)
        }
    } else {
        res.status(400).send("Missing login data")
    }
}