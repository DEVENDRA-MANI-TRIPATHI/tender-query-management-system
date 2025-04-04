import app from "./app.js"
import "dotenv/config"

const PORT=process.env.PORT

app.listen(PORT, (req,res) => {
    console.log(`server is up and running ${PORT}`)
})