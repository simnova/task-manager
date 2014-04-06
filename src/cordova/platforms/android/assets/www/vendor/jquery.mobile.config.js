define(['jquery'], function ($) {
  console.log("mobile.config executing");
  $(document).on("mobileinit", function () {
      console.log("mobileinit fired");
      $.mobile.ajaxEnabled = false;
      $.mobile.linkBindingEnabled = false;
      $.mobile.hashListeningEnabled = false;
      $.mobile.pushStateEnabled = false;
  });
});