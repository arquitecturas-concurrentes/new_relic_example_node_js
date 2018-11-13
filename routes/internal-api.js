const express = require('express');
const router = express.Router();
const pool = require('../db/mysql-pool');

/*select * from salaries s left join employees e on e.emp_no = s.emp_no;*/
function slow(res) {
    const sql = "select * from departments d " +
        "inner join dept_emp de " +
        "on d.dept_no=de.dept_no " +
        "left join salaries s " +
        "on s.emp_no=de.emp_no " +
        "inner join employees e " +
        "on e.emp_no=de.emp_no " +
        "where dept_name= ?;";
    console.log(sql);
    pool.query(sql, ['Development'], function (error, results, fields) {
        if (error) throw error;
        res.json({
            total: results.length
        });
    });
}

function doLog() {
    console.log("some logging....");
}

/*simulate a slow api call*/
router.get('/', function (req, res, next) {
    doLog();
    slow(res);
    doLog();
});

module.exports = router;
