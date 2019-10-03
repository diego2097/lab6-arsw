const Url = 'http://localhost:8080/blueprints/';
apiclient = (function () {
  var f = []
  return {
    getBlueprintsByAuthor: function (name, callback) {
      jQuery.ajax({
        url: Url + name,
        success: function (result) {
          callback(name, result);
        },
      });
    },
    getBlueprintsByNameAndAuthor: function (author, name, callback) {
      jQuery.ajax({
        url: Url + author + "/" + name,
        success: function (result) {
          
          callback(result);
        },
      });
    },
    setBlueprint: function (author, plano, bp, callback) {
      var promise = $.ajax({
        url: "/blueprints/" + author + "/" + plano + "/",
        type: "PUT",
        data: bp,
        contentType: "application/json"
      });

      promise.then(
        function () {
          console.info("OK setBlueprint");
          callback()
        },
        function () {
          console.info("ERROR setBlueprint");
        }
      );
    },

    repaintPoints: function (nameAuthor, nameP, callback) {
      callback();
    }
  };

})();