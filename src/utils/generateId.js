const ID_LENGTH = 16;

export const generateId = (idLength = ID_LENGTH) => {
  const randomStr = Math.random().toString(16);
  const timeStr = new Date().getTime().toString(26);
  return (randomStr + timeStr).slice(-idLength);
};
