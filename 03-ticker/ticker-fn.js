import { EventEmitter } from "events";

const callTimeout = (counter, limit, timer, emitter, callback) => {
  setTimeout(() => {
    if (limit <= 0) {
      return callback(null, counter);
    }

    emitter.emit("tick", limit);

    callTimeout(++counter, limit - timer, timer, emitter, callback);
  }, timer);
};

export const tickerFn = (limit, timer, callback) => {
  const emitter = new EventEmitter();

  callTimeout(0, limit, timer, emitter, callback);

  return emitter;
};
