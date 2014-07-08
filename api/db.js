"use strict";

var merchantId = "SEAM";
var i_am_using_a_proxy = true;
var pathToProxy = "http://uc-rest.seamonsterstudios.io/rest_proxy.php";
var fullPathCart = i_am_using_a_proxy ? pathToProxy + "?_url=/rest/cart" : "/rest/cart";
var fullPathItem = i_am_using_a_proxy ? pathToProxy + "?_url=/rest/site/items" : "/rest/site/items";

module.exports = {
    cartUrl : fullPathCart,
    itemUrl : fullPathItem
};