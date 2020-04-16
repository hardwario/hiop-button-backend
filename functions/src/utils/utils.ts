export const getButtonNumber = (
  button0: boolean,
  button1: boolean,
  button2: boolean,
  button3: boolean
) => {
  const buttons = [button0, button1, button2, button3];
  switch (true) {
    case buttons[0]:
      return 0;
    case buttons[1]:
      return 1;
    case buttons[2]:
      return 2;
    case buttons[3]:
      return 3;
    default:
      return 0;
  }
};

module.exports = {
  getButtonNumber
};
