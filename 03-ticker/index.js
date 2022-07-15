import { tickerRecursive } from "./ticker-recursive.js";

const tickerEnd = (err, tick) => {
  if (err) {
    console.error(`An error occurred : ${err.message}`);
  }

  console.log(tick);
};

tickerRecursive(1000, tickerEnd).on("tick", (timePassed) =>
  console.log(timePassed)
);
