export interface UserCreateDTO {
  first_name: string;
  last_name?: string;
  password: string;
  email?: string;
  phone?: string;
  profile_image_url?: string;
  user_name: string;
}
