const express = require('express');
const router = express.Router();
const pool = require('../db/mysql-pool');

function getDepartments(res) {
    const sql = "select * from departments d ";
    console.log(sql);
    pool.query(sql, ['Development'], function (error, results, fields) {
        if (error) throw error;
        res.json({
            total: results.length
        });
    });
}

function verySlow(res) {
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

function getAllEmployees(res) {
    const sql = "select * from employees e ";
    console.log(sql);
    pool.query(sql, [], function (error, results, fields) {
        if (error) throw error;
        res.json({
            total: results.length,
            data: results
        });
    });
}

function doLater(action) {
    //action();
    //setTimeout(action, 0);
    setTimeout(action, Math.random() * 500);
}

router.get('/', function (req, res, next) {
    const probability = Math.floor((Math.random() * 100) + 1);


    if(probability < 20) {
        console.log('Enetering Very Slow');
        verySlow(res);
    }
    else if(probability < 30) {
        console.log('Entering Get All Employees with Delay');
        doLater(getAllEmployees(res));
    }
    else if(probability < 60) {
        console.log('Entering Get All Employees');
        getAllEmployees(res);
    }
    else if(probability <= 100) {
        console.log('Entering Get All Departments, pretty fast');
        getDepartments(res);
    }
});

module.exports = router;