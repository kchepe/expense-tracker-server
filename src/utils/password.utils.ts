import * as bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (
  userPassword: string,
  rawPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(rawPassword, userPassword);
};

export { hashPassword, comparePassword };
