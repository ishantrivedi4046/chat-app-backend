import ModelNotFoundException from "../ModelNotFoundException";

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new UserNotFoundException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class UserNotFoundException extends ModelNotFoundException {
  constructor(id: number) {
    super(`User with id ${id} not found`);
  }
}
