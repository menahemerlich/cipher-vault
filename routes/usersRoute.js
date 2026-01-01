import express from "express"
import { db } from "../DB/connectMongo.js"
import { authentication } from "../middleware/authentication.js"
import { register } from "../middleware/register.js"

export const userRoute = express.Router()

userRoute.post("/auth/register",register, async (req, res) => {
    const {username} = req.body
    req.body.encryptedMessagesCount = 0
    req.body.createdAt = new Date().toISOString()
    const result  = await db.collection("users").insertOne(req.body)
    return res.status(201).json({id: result.insertedId, username: username})    
})

userRoute.get("/users/me", authentication, async (req, res) => {
    const {username} = req.headers
    const data = await db.collection("users").find({username: {$eq: username}}).toArray()    
    res.status(200).json({username: username, encryptedMessagesCount: data[0].encryptedMessagesCount})
})