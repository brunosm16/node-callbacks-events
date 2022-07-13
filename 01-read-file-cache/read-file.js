import { readFile } from "fs";

let cache = new Map();

const readFileSetCache = (fileName, onRead) =>
  readFile(fileName, "utf-8", (err, data) => {
    cache.set(fileName, data);
    onRead(data);
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

  readFileCache(fileName, (result) =>
    listeners.forEach((listener) => listener(result))
  );

  return {
    registerListener: (listener) => listeners.push(listener),
  };
};

export const read = (fileName, print) => {
  const readCache = createReadFile(fileName);
  readCache.registerListener((result) => print(result));
};
