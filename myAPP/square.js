module.exports = (num) => {
  if (!num || typeof num == String) {
    return "Please pass Number";
  } else {
    return num * num;
  }
};
