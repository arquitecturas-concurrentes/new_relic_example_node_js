const express = require('express');
const router = express.Router();


function readFile(res) {
    fs.readFile("data/wx.hourly.txt", "utf8", function(err, data){
        console.log(err);
        if(err) throw err;
        //do operation on data that generates say resultArray;
        res.send(data);
    });
    return;
}

/*simulate a slow api call*/
router.get('/', function (req, res, next) {
    readFile(res)
});

module.exports = router;
