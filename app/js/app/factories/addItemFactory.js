"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;

module.exports = function(app) {
    app.factory("AddItem", function($http, $location, $q, ipCookie) {
        var cart = {};
        cart.add = function(id) {
            var deferred = $q.defer();
            if(!myCart.items) {
                myCart['items'] = [];
            }
            myCart.items.push({itemId: id, quantity: 1});
            var jCart = JSON.stringify(myCart);
            return $http({
                url: cartUrl,
                method: "POST",
                data: jCart,
                params: {_mid: merchantId, _cid: ipCookie("UltraCartShoppingCartID")},
                dataType: "json",
                cache: false
            })
            .success(function(cart, status, headers, config) {
                window.myCart = cart;
                deferred.resolve(myCart);
            })
            .error(function(cart, status, headers, config) {
                console.log("there was an error with AddItem: " + cart);
                deferred.reject();
            });
            return deferred.promise;
        }
        return cart;
        return deferred.promise;
    });// end app.factory("AddItem")
}// end module.exports