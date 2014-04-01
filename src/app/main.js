// Break out the application running from the configuration definition to
// assist with testing.
require(["config"], function() {
  // Kick off the application.
  require(["app", "router"], function(app, Router) {
    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    app.router = new Router();

    // Trigger the initial route and enable HTML5 History API support, set the
    // root folder to '/' by default.  Change in app.js.
    document.addEventListener('deviceready', function() {
      // Trigger the initial route, set the
      // root folder to '' by default.  Change in app.js.
      Backbone.history.start({
        pushState: false,
        root: app.root
      });
    });

    /*
    Backbone.history.start({
      pushState: true,
      root: app.root
    });
    */

    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router. If the link has a `data-bypass`
    // attribute, bypass the delegation completely.
    $(document).on("click", "a[href]:not([data-bypass])", function (evt) {
      // Get the absolute anchor href.
      var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
      // Get the absolute root.
      var root = location.protocol + "//" + location.host + app.root;

      // Ensure the root is part of the anchor href, meaning it's relative.
      if (href.prop.slice(0, root.length) === root) {
        // Stop the default event to ensure the link will not cause a page
        // refresh.
        evt.preventDefault();

        // `Backbone.history.navigate` is sufficient for all Routers and will
        // trigger the correct events. The Router's internal `navigate` method
        // calls this anyways.  The fragment is sliced from the root.
        if (href.attr.substring(0, 5) === '/form') {
          app.trigger('setForm', href.attr.substring(6));
          if (!app.isMobile) {
            app.setScrollTop();
          }
        } else {
          Backbone.history.navigate(href.attr, true);
        }
      }
    });


  });
});