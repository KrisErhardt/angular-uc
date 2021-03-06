"use strict";
var baseUrl    = require("../../../../api/db");
var cartUrl    = baseUrl.cartUrl;
var itemUrl    = baseUrl.itemUrl;
var merchantId = baseUrl.merchantId;

module.exports = function(app) {
    app.controller("ItemController", function($scope, $http, $location, $routeParams, AddItem, CreateCart, LoadCart, ipCookie) {
        $scope.message = "I am on the ItemController page";

        var id = $routeParams.id;

        $http({
            url:itemUrl + id,
            method: "GET",
            params: {_mid: merchantId},
            dataType: "json",
            cache: false
        })
        .success(function(data, status, headers, config) {
            console.log(data);
            $scope.itemDisplay = data;
        })
        .error(function(data, status, headers, config) {
            console.log("there was an error: " + data);
        });// end $http.get

        $scope.addItem = function(id) {
            console.log("inside of addItem");
            AddItem.add(id).then(function() {
                console.log("inside of defered call");
                $scope.createCart();
            });
        }// end $scope.addItem()

        $scope.createCart = function() {
            if(ipCookie("UltraCartShoppingCartID")) {
                LoadCart.load().then(function(myCart) {
                    console.log("LoadCart.load() from ItemController");
                    console.log(myCart.data);
                    $scope.cartDisplay = myCart.data;
                });
            } else {
                console.log("inside else createCart");
                CreateCart.create().then(function(myCart) {
                    console.log("CreateCart.create() from ItemController");
                    $scope.cartDisplay = myCart.data;
                });
            }
        }// end $scopeCreateCart()

        $scope.createCart();

        $scope.goToCheckout = function() {
            $location.path("/checkout");
        }// end $scope.goToCheckout

    }); // end app.controller("ItemController")
}; // end module.exports