#!/bin/bash
echo "Using Bash version ${BASH_VERSION}..."


echo "Cloning repo - see on https://github.com/datacharmer/test_db"
git clone https://github.com/datacharmer/test_db.git test_db
cd test_db
echo "Setting up test_db databse"
mysql < employees.sql

