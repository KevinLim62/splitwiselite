import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

export const passwordHash = async (password: string) => {
  return await bcrypt.hash(password, saltOrRounds);
};

export const passwordMatch = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
