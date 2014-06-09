define(function (require) {
 
  var module;
 
  // Setup temporary Google Analytics objects.
  /*
  window.GoogleAnalyticsObject = "ga";
  window.ga = function () { (window.ga.q = window.ga.q || []).push(arguments); };
  window.ga.l = 1 * new Date();
  window.createElement('script');
  window.getElementsByTagName('script')[0];


  (function(i,s,o,g,r,a,m){
    i['GoogleAnalyticsObject']=r;
    i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','http://www.google-analytics.com/analytics.js','ga');

   */
  // Immediately add a pageview event to the queue.
  window.ga("create", "UA-39974786-12", {
    'storage': 'none',
    'clientId': '35009a79-1a05-49d7-b876-2b884d0f825b'
    }
  );
  window.ga("send", "pageview");
 
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