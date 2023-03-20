import Route from "@ioc:Adonis/Core/Route";

Route.post("/login", "AuthController.login").middleware("verifyUser");
Route.post("/signup", "AuthController.signup");
Route.get("/verify/:id", "AuthController.verifyUser");
