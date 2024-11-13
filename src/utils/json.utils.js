const parseJSON = (data) => {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

module.exports = {
  parseJSON,
};
