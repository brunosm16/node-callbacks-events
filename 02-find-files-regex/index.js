import { FindFilesByRegex } from "./find-files-by-regex.js";

const txt = new FindFilesByRegex(/\.txt$/);

txt
  .pushDirectory("./data-txt")
  .pushDirectory("./data-txt-3")
  .findFiles()
  .on("error", (err) => console.error(`Error occurred : ${err.message}`))
  .on("reading", (dir) => console.log(`Reading the directory : ${dir}`))
  .on("found", (txtFile) => console.log(`.TXT file was found: ${txtFile}`));

const json = new FindFilesByRegex(/\.json$/);

json
  .pushDirectory("./data-json")
  .findFiles()
  .on("error", (err) => console.error(`Error ocurred : ${err.message}`))
  .on("reading", (dir) => console.log(`Reading the directory : ${dir}`))
  .on("found", (jsonFile) => console.log(`.JSON file was found: ${jsonFile}`));
