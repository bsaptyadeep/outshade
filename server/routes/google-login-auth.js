const { User } = require("../models/user");
const router = require("express").Router();
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");


router.post("/", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.Du.tv });
        if (!user)
            return res.status(401).send({ message: "Gmail Account not Registered" });
        // console.log(user);
        if (user.verfied==false) {
            let token = await Token.findOne({ email: req.body.Du.tv });
            if (!token) {
                token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();
                const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
                await sendEmail(user.email, "Verify Email", url);
            }
            return res
                .status(400)
                .send({ message: "An Email sent to your account please verify" });
        }
        const token = user.generateAuthToken();
        // console.log(token);
        res.status(200).send({ data: token, message: "logged in successfully"});
    }
    catch (e) {
        res.status(500).send({message: "Internal Server Error"});
    }
})

module.exports = router;