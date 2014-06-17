define(function (require) {
 
  var module;
 
  // Setup temporary Google Analytics objects.
  //window.ga = function () { (window.ga.q = window.ga.q || []).push(arguments); };

  // Immediately add a pageview event to the queue.
  window.ga("create", "UA-38701655-4", {
    'storage': 'none',
    'clientId': '35009a79-1a05-49d7-b876-2b884d0f825b'
    }
  );
 
  // Create a function that wraps `window.ga`.
  // This allows dependant modules to use `window.ga` without knowingly
  // programming against a global object.
  module = function () { window.ga.apply(this, arguments); };
 
  // Asynchronously load Google Analytics, letting it take over our `window.ga`
  // object after it loads. This allows us to add events to `window.ga` even
  // before the library has fully loaded.
  //require(["http://www.google-analytics.com/analytics.js"]);
  require("analytics");

  return module;
});