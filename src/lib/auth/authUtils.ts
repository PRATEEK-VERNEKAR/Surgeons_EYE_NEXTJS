import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
};