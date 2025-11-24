/**
 * Pre-initialization script
 * Sets up theme object BEFORE theme.js loads to prevent errors
 */
(function() {
  'use strict';
  
  // Initialize theme object
  window.theme = window.theme || {};
  
  // Set up theme settings
  window.theme.settings = {
    dynamicVariantsEnable: true,
    cartType: "drawer",
    isCustomerTemplate: false,
    moneyFormat: "${{amount}}",
    predictiveSearch: false,
    predictiveSearchType: "product,page,article",
    quickView: false,
    themeName: 'Motion',
    themeVersion: "8.0.0"
  };
  
  // Set up theme routes
  window.theme.routes = {
    home: "/",
    cart: "/cart.js",
    cartPage: "/cart",
    cartAdd: "/cart/add.js",
    cartChange: "/cart/change.js"
  };
  
  // Set up theme strings
  window.theme.strings = {
    soldOut: "Sold Out",
    unavailable: "Unavailable",
    inStockLabel: "In stock",
    stockLabel: "[count] in stock",
    willNotShipUntil: "Will not ship until [date]",
    willBeInStockAfter: "Will be in stock after [date]",
    waitingForStock: "Inventory on the way",
    cartSavings: "You're saving [savings]",
    cartEmpty: "Your cart is currently empty.",
    cartTermsConfirmation: "You must agree with the terms and conditions",
    searchCollections: "Collections",
    searchPages: "Pages",
    searchArticles: "Articles"
  };
  
  // Set up lazy sizes config
  window.lazySizesConfig = window.lazySizesConfig || {};
  window.lazySizesConfig.expFactor = 2.2;
  
  console.log('Lead Fall Agency theme pre-initialized');
})();
