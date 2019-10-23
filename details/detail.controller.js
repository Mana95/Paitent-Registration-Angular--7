const express = require('express');
const router = express.Router();
const detailService = require('./detail.service');

router.post('/faceRegister' , faceRegister);


module.exports = router;



function faceRegister(req, res, next) {

    console.log(req.body);
    detailService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}