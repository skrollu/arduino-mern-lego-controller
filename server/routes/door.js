const express = require("express");
const router = express.Router();
const Door = require('../Database/models/door')

/**
 * @route /door
 * @access PUBLIC
 * @request GET
 */
router.get('/door', (req, res) => {
    Door.find({}, async (err, datas) => {
        if(err) {
            console.log(err)
        } else {
            if(datas) {
                //sort datas by date (asending)
                await datas.sort((a, b) => {
                    return a.date - b.date
                })

                //We only send the 30 last datas.
                const datasToSend = await datas.slice(datas.length - 30);
                //console.log(datasToSend)
                res.json(datasToSend);
            }
        }
    });
});

module.exports = router;
