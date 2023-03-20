/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { validator } from "@ioc:Adonis/Core/Validator";

validator.rule("password", (value, _, { errorReporter, pointer }) => {
  if (typeof value !== "string") return;
  const regexUppercase = new RegExp("^(?=.*?[A-Z]).*$");
  const regexLowerCase = new RegExp("^(?=.*?[a-z]).*$");
  const regexDigit = new RegExp("^(?=.*?[0-9]).*$");
  const reqexSpecialChar = new RegExp("^(?=.*?[#?!@$%^&*-]).*$");
  const regexLength = new RegExp("^.{8,}$");

  if (!regexUppercase.test(value)) {
    errorReporter.report(pointer, "password", "Password does not contains a uppercase character!");
  } else if (!regexLowerCase.test(value)) {
    errorReporter.report(pointer, "password", "Password does not contains a lowercase character!");
  } else if (!regexDigit.test(value)) {
    errorReporter.report(pointer, "password", "Password does not contains a digit!");
  } else if (!reqexSpecialChar.test(value)) {
    errorReporter.report(pointer, "password", "Password does not contains a special character!");
  } else if (!regexLength.test(value)) {
    errorReporter.report(pointer, "password", "Password should be atleast 8 characters long!");
  }
});
