export interface PasswordData {
  oldPassword?: string;
  newPassword: string;
  newPasswordConfirm: string;
  token?: string;
}
