const messages = {
  required: "The {{ field }} field is required",
  number: "The {{ field }} must be a number",
  string: "The {{ field }} must be a string",
  email: "The value must be a valid {{ field }} - (like: example@abc.com)",
  minLength: "The length of {{ field }} must be greater than {{ options.minLength }}",
  unique: "The {{ field }} already exists",
  enum: "The {{ field }} is an enum and should have values from choices",
  object: "The {{ field }} must be an object",
};

export default messages;
