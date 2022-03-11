const getRandom = () => {
  const date = new Date().getTime();
  const random = Math.floor(Math.random() * (date % 100000));
  return random;
};

export default getRandom;
