require.config({
  "baseUrl": "js/lib",
  "paths": {
    "selectMenu": "../selectMenu"
  }
});

requirejs(["selectMenu/main"]);
