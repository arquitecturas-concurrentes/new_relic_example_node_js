var nr = require('newrelic');
var uuid = require('uuid');
const express = require('express');
var redis = require('redis').createClient();

var router = express.Router();

function redisUpdater(res) {
    // Using API#getTransaction to manage ending the transaction
    var intervalId = setInterval(function () {
        nr.startBackgroundTransaction('update:cache', function transactionHandler() {
            var newValue = uuid.v1();
            var transaction = nr.getTransaction();

            console.log('looping inside the redis update interval');
            redis.set('some:cache:key', newValue, function () {
                transaction.end()
            });
            if (Math.random() < 0.1) {
                console.log('Exited update cache interval');
                clearInterval(intervalId);
            }
        })
    }, 3000); // Every 3s
    res.sendStatus(200);
}

/* GET home page. */
router.get('/', function(req, res, next) {
    redisUpdater(res);
});

module.exports = router;



