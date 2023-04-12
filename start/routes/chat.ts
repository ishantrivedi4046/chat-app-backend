import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.group(() => {
    Route.post("", "UserChatsController.sendInvite");
    Route.get("/verify/:invc", "UserChatsController.verifyInvite");
  }).prefix("/invite");
}).middleware("auth");
