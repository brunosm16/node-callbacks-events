import { read } from "./read-file.js";

const dir = "./data/lorem-ipsum.txt";
const dir2 = "./data/lorem-ipsum-2.txt";
const dir3 = "./data/lorem-ipsummmm-2.txt";


const log = (err, msg) => {
  if (err) console.error(err);
  else console.log(msg);
};

read(dir, (err, result) => log(err, result));
read(dir2, (err, result) => log(err, result));
read(dir3, (err, result) => log(err, result));
