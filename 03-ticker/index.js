import { tickerFn } from "./ticker-fn.js";
import { Ticker } from "./Ticker.js";

const ticksPrint = (err, tick) => {
  if (err) {
    console.error(`An error occurred : ${err.message}`);
  }

  console.log(`Total ticks : ${tick}`);
};

// tickerFn(1000, 30, ticksPrint).on("tick", (timePassed) => console.log(timePassed));

const ticker = new Ticker(30, 1000);
ticker
  .runTicker(ticksPrint)
  .on("tick", (timePassed) => console.log(timePassed));
