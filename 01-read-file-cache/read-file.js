import { readFile } from "fs";

let cache = new Map();

const readFileSetCache = (fileName, onRead) =>
  readFile(fileName, "utf-8", (err, data) => {
    if (err) onRead(err);

    try {
      cache.set(fileName, data);
    } catch (err) {
      onRead(err);
    }

    onRead(null, data);
  });

const processTick = (file, onRead) => process.nextTick(() => onRead(file));

const readFileCache = (fileName, onRead) => {
  const fileCache = cache.get(fileName);
  fileCache
    ? processTick(fileCache, onRead)
    : readFileSetCache(fileName, onRead);
};

const createReadFile = (fileName) => {
  const listeners = [];

  readFileCache(fileName, (err, result) =>
    listeners.forEach((listener) => listener(err, result))
  );

  return {
    registerListener: (listener) => listeners.push(listener),
  };
};

export const read = (fileName, print) => {
  const readCache = createReadFile(fileName);
  readCache.registerListener((err, result) => print(err, result));
};
