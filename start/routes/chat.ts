import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/invite", "UserChatsController.sendInvite");
}).middleware("auth");
