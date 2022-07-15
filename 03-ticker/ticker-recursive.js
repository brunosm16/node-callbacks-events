import { EventEmitter } from "events";

const callTimeout = (counter, limit, timer, emitter, callback) => {
  setTimeout(() => {
    if (limit <= 0) {
      return callback(null, counter);
    }

    emitter.emit("tick", limit);

    callTimeout(++counter, limit - 50, timer, emitter, callback);
  }, timer);
};

export const tickerRecursive = (limit, callback) => {
  const emitter = new EventEmitter();

  callTimeout(0, limit, 30, emitter, callback);

  return emitter;
};
