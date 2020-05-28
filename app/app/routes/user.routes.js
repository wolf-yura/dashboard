const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/test/all", controller.allAccess);

  // app.get(
  //   "/api/test/user",
  //   [authJwt.verifyToken],
  //   controller.userBoard
  // );

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );

  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
  app.get("/api/user/all",[authJwt.verifyToken, authJwt.isAdmin],controller.userAll);
  app.get("/api/user/activeall",[authJwt.verifyToken, authJwt.isAdmin],controller.userActiveAll);
  app.post("/api/user/one",[authJwt.verifyToken, authJwt.isAdmin],controller.userOne);
  app.post("/api/user/update", [authJwt.verifyToken, authJwt.isAdmin], controller.update);
  app.post("/api/user/delete", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);
  app.post("/api/user/setActive", [authJwt.verifyToken, authJwt.isAdmin], controller.setActive);

};
