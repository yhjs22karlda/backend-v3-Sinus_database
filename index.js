import express from "express"
import Datastore from "nedb-promises"
import {router as productsRouter} from "./routes/products.js"
import {router as cartRouter} from "./routes/cart.js"

export const productsDB = Datastore.create("db/products.db")
export const cartDB = Datastore.create("db/cartDB.db")
export const ordersDB = Datastore.create("db/ordersDB.db")

const app = express()
const PORT = 3000

app.use(express.json())
app.use("/api/products", productsRouter)
app.use("/api/cart", cartRouter)
app.use((req, res) => {
    res.status(404).json({status:false, msg:"404 Not Found."})
})

app.listen(PORT, () => {
    console.log("Listening to port " + PORT)
})