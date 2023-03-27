import {Router} from "express"
import {productsDB} from "../index.js"

export const router = Router()

router.get("/", (req, res) => {
    productsDB.find({})
        .then((allProducts) => res.json(allProducts))
        .catch(err => res.status(500).json("Database error: " + err))
})