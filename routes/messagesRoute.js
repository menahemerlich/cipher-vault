import express from "express"
import { authentication } from "../middleware/authentication.js"
import { supabase } from "../DB/connectSupabase.js"
import { encrypt } from "../middleware/encrypt.js"
import { db } from "../DB/connectMongo.js"
import { rendomShuffle } from "../utils/randomShuffle.js"
import { atbash } from "../utils/atbash.js"

export const messagesRoute = express.Router()

messagesRoute.post("/encrypt", authentication, encrypt, async (req, res) => {
    const {message, cipherType} = req.body
    let encryptedText;
    if (cipherType === "reverse"){
        encryptedText = message.split('').reverse().join('').toUpperCase()
    }
    if (cipherType === "randomShuffle"){
        encryptedText = rendomShuffle(message)
    }
    if (cipherType === "atbash"){
        encryptedText = atbash(message.toUpperCase())
    }
    const {data} = await supabase.from("messages").insert({username: req.headers.username, cipher_type: cipherType, encrypted_text: encryptedText}).select() 
    await db.collection("users").updateOne({username: {$eq: req.headers.username}}, {$inc: {encryptedMessagesCount: 1 }})  
    res.status(201).json({id: data[0].id, cipherType: cipherType, encryptedText: encryptedText})
})

messagesRoute.post("/decrypt", authentication, async (req, res) => {
    if (req.body && req.body.messageId && typeof req.body.messageId === "number"){        
        const { data} = await supabase.from("messages").select("*").eq("id", req.body.messageId)
        let decryptedText
        if (data.length > 0){
            if (data[0].cipher_type === "reverse"){
                decryptedText = data[0].encrypted_text.split('').reverse().join('').toLowerCase()
                res.status(200).json({id: data[0].id, decryptedText: decryptedText})
            } else if (data[0].cipher_type === "atbash"){
                decryptedText = atbash(data[0].encrypted_text)
                res.status(200).json({id: data[0].id, decryptedText: decryptedText})
            } else {
                res.status(200).json({ id: data[0].id, decryptedText: null, error: "CANNOT_DECRYPT" })
            }
        } else {
            res.status(404).send(`messageId [${req.body.messageId}] not found.`)
        }
    } else {
        res.status(400).send("missind data")
    }
})

messagesRoute.get("/", authentication, async (req, res) => {
    const {username} = req.headers
    const { data} = await supabase.from("messages").select("*").eq("username", username)
    res.status(200).json({items: data})
})



