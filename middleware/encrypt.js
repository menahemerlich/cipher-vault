
export async function encrypt(req, res, next) {
    if (req.body && req.body.message && req.body.cipherType && Object.keys(req.body).length === 2){
        const {message, cipherType} = req.body
        if (typeof message === "string" && (cipherType === "reverse" || cipherType === "randomShuffle" || cipherType === "atbash")){
            next()
            return
        } 
    }
    res.status(400).send("missind data")
}