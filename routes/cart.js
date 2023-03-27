import {Router} from "express"
import {cartDelete, cartPost, cartOrder} from "../utils.js"

import { cartDB } from "../index.js"
import { ordersDB } from "../index.js"

export const router = Router()

router.get("/", (req, res) => {
    cartDB.find({})
        .then((cart) => res.json(cart))
        .catch(err => res.status(500).json("Database error: " + err))
})

router.post("/", cartPost, (req, res) => {
    cartDB.insert({ serial: req.body.serial})
    res.json({
        sucsess: true,
        msg: `Article number ${req.body.serial} added to cart`
    })
})

router.delete("/", cartDelete, (req, res) => {
    cartDB.remove({serial: req.body.serial})
    res.json({
        sucsess:true,
        msg: `Item with serialnumber ${req.body.serial} deleted.`
    })
})

router.post("/order", cartOrder, async (req, res) => {
    const order = {
        order: await cartDB.find({}),
        paid: false,
        address: {
            name: req.body.address.name,
            street: req.body.address.street,
            city: req.body.address.city,
            zip: req.body.address.zip
        },
        card: {
            owner: req.body.card.owner,
            number: req.body.card.number,
            valid: req.body.card.valid,
            ccv: req.body.card.ccv
        }
    }
    ordersDB.insert(order)
    cartDB.remove({}, {multi: true})

    res.json({
        sucsess:true,
        msg: `Order added.`
    })
})