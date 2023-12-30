var express = require('express');
var router = express.Router();
import OpenAI from "openai";

const openai = new OpenAI();
router.post('/', async (req, res, next) => {
    try {
        const {text}= req.body;
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: text }],
            model: "gpt-3.5-turbo",
          });
        res.status(200).json({result: false,messages:"ket qua ne: "+completion.choices[0] });
    } catch (error) {
        res.status(200).json({});
    }
});
module.exports = router;
