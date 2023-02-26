import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/", "UsersController.me");
})
  .prefix("me")
  .middleware(["auth"]);
