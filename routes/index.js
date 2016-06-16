var express = require('express');
var triplesec = require('triplesec');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Securit0r' });
});

router.post('/', function(req, res, next){
  var name = req.body.name;
  var text = req.body.secrettext;
  var pass = req.body.password;
  var type = req.body.type;

  // check if all fields are filled in.
  if(!name || !text || !pass){
    res.render('home', {title: 'Securit0r', error: "Vul alle velden in"});
  }
  console.log(type);
  if(type == 'encrypt'){
    triplesec.encrypt( {
      data:           new triplesec.Buffer(text),
      key:            new triplesec.Buffer(pass),
    }, function(err, buff){

      if(!err){
        var ciphertext = buff.toString('hex');
        res.render('home', { title: 'Securit0r', result: ciphertext });
      }
      else{
        var message = err.toString();
        res.render('home', { title: 'Securit0r', error: message });
      }
    });
  }
  else{
    triplesec.decrypt ({

    data:          new triplesec.Buffer(text, "hex"),
    key:           new triplesec.Buffer(pass)

}, function(err, buff) {

    if(!err) {
        var plaintext = buff.toString();
        res.render('home', {title: 'Securit0r', result: plaintext});
    }
    else{
        var message = err.toString();
        res.render('home', {title: 'Securit0r', error: message});
    }

  });
}


});

module.exports = router;
