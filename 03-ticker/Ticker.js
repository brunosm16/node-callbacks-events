import { EventEmitter } from "events";

export class Ticker extends EventEmitter {
  constructor(timer, limit) {
    super();
    this.timer = timer;
    this.limit = limit;
    this.currentTime = 0;
    this.ticks = 0;
  }

  runTicker(cb) {
    const timeout = () =>
      setTimeout(() => {
        if (this.currentTime > this.limit) {
          return process.nextTick(() => cb(null, this.ticks));
        }

        this.emit("tick", this.currentTime);

        process.nextTick(() => (this.currentTime += this.timer));
        process.nextTick(() => this.ticks++);

        setTimeout(timeout, this.timer);
      }, this.timer);

    timeout();

    return this;
  }
}
