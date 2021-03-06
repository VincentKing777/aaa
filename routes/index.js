var express = require('express');
var router = express.Router();

// var Cart = require('../models/cart');
// var products = require('../data/products.json');

const request = require('request');

const controllers = require("../controllers/index.js");


router.get('/home', function (req, res) {
    res.render('index', {
        title: 'NodeJS Exam'
    });
});


router.get('/nasa', controllers.getUserInfo);

// router.get('/deckofcardsapi/:carNum', controllers.getLoginPage);

// router.get('/regist', controllers.getRegisterPage);

// // router.post('/register',controllers.register);

// router.get('/vcode', controllers.getVcodeImage);

// router.post('/login', controllers.login);

// router.get('/logout', controllers.logout);


router.get('/deckofcardsapi/:cardNum', function (req, res) {
    var cardNum = req.params.cardNum;

    getdeckofcardsapidata(cardNum).then(result => {
        console.log(JSON.stringify(result.result,null,4))
        res.render('deckofcardsapi', {
            title: 'deckofcardsapi',
            cardNum: cardNum,
            cards: result.result.cards
        });
    })
    
    // var cart = new Cart(req.session.cart ? req.session.cart : {});
    // var product = products.filter(function (item) {
    //     return item.id == productId;
    // });
    // cart.add(product[0], productId);
    // req.session.cart = cart;
    // res.redirect('/');
});

// router.get('/cart', function (req, res) {
//     if (!req.session.cart) {
//         return res.render('cart', {
//             products: null,
//             username: req.session.username
//         });
//     }
//     var cart = new Cart(req.session.cart);

//     getExchangeRate().then(result => {
//         res.render('cart', {
//             title: 'Shopping Cart',
//             products: cart.getItems(),
//             totalPrice: cart.totalPrice,
//             username: req.session.username,
//             rate: result.rate,
//             totalUsdPrice: (cart.totalPrice/result.rate).toFixed(2)
//         });
//     })
// });

// router.get('/remove/:id', function (req, res,) {
//     var productId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart : {});

//     cart.remove(productId);
//     req.session.cart = cart;
//     res.redirect('/cart');
// });

/*Empty shopping cart*/
// router.get('/emptycart', function (req, res,) {
//     req.session.cart = {};
//     res.redirect('/?username='+req.session.username);
// });

module.exports = router;




var getdeckofcardsapidata = (N) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://deckofcardsapi.com/api/deck/qgb8pwjp4t9s/draw/?count=` + N,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject(error);
            } else if (body.error) {
                reject('param available');
            } else {

                resolve({
                    result: body
                });
            }
        });
    });
};