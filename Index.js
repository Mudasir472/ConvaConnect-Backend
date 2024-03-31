const express = require('express');
const collection = require('./mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// app.get("/Login", cors(), (req, res) => {

// })

app.post("/Login", async (req, res) => {
    const { email, password } = req.body

    try {
        const check = await collection.findOne({ email: email })
        if (check) {
            return res.status(202).json({
                success: true,
                message: "User Login"
            })
        }
        return res.status(502).json({
            success: false,
            message: "User Not Exist"
        })
    }
    catch (e) {
        return res.status(504).json({
            success: false,
            message: "something went wrong!!",
            error:e.message
        })
    }
})
app.post("/SignUp", async (req, res) => {
    const { email, password, name } = req.body

    const data = {
        email: email,
        password: password,
        name: name,
    }

    try {
        const check = await collection.findOne({ email: email })
        if (check) {
            return res.status(504).json({
                success: false,
                message: "user already registered!!"
            })
        }

        const user = await collection.create({
            email,
            password,
            name,
        })
        if(!user){
            return res.status(404).json({
                success:false,
                message:"something went wrong in the user model!!"
            })
        }
        return res.status(201).json({
            success: true,
            message: "user registered successfully!!",
            data: user
        })


    }
    catch (e) {
        return res.status(504).json({
            success: false,
            message: "something went wrong!!",
            error:e.message
        })
    }
})

app.listen(8000, () => {
    console.log("Port Connect")
})