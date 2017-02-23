/**
 * Created by subtainishfaq on 10/18/16.
 */
var country = require('countryjs');
var express = require('express');

var router = express.Router();

router.route('/getstate/:country')
    .get(function(req, res) {

        console.log(req.params.country);
        console.log(country.states(req.params.country));
        console.log(country.states('US'));
        console.log(country.states('India'));

        res.json(   country.states(req.params.country));

});


module.exports = router;
