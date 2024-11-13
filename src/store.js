const fs = require("fs/promises");
const { existsSync } = require("fs");

const path = require("path");
const { parseJSON } = require("./utils/json.utils");

const storePath = (table) => {
  return path.join(__dirname, "../store", `${table}.json`);
};

const checkStore = async (table) => {
  const folderPath = path.join(__dirname, "../store");

  if (!existsSync(folderPath)) {
    await fs.mkdir(folderPath);
  }

  const filePath = path.join(folderPath, `${table}.json`);

  if (!existsSync(filePath)) {
    await fs.writeFile(filePath, "");
  }
};

const readStore = async (table) => {
  await checkStore(table);
  const tablePath = storePath(table);

  let result = await fs.readFile(tablePath);

  return parseJSON(result.toString("utf8"));
};

const updateStore = async (table, data) => {
  await checkStore(table);
  const tablePath = storePath(table);

  try {
    fs.writeFile(tablePath, JSON.stringify(data));
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = {
  readStore,
  updateStore,
  checkStore,
};
