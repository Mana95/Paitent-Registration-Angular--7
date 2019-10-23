const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Details = db.Details;


module.exports = {


    create
   

};



async function create(userParam) {
    console.log("test");
    const details = new Details(userParam);
    console.log(details);
    await details.save();
}