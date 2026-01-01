import express from "express"
import "dotenv/config"
import { userRoute } from "./routes/usersRoute.js"
import { messagesRoute } from "./routes/messagesRoute.js"


const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use("/api", userRoute)
app.use("/api/messages", messagesRoute)




app.listen(PORT, () => {
    console.log(`Server running on http:localhost:${PORT}`);
});

