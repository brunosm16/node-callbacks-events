import { read } from "./read-file.js";

const dir = "./data/lorem-ipsum.txt";

read(dir, (data) => console.log(`\n Lorem Ipsum first read -> ${data} \n`));

read(dir, (data) => {
  console.log(`\n Lorem Ipsum second read -> ${data} \n`);

  read(dir, (data) => {
    console.log(`\n Nested reading -> ${data} \n`);
  });
});

read("./data/lorem-ipsum-2.txt", (data) =>
  console.log(`\nLorem Ipsum 2 read -> ${data}\n`)
);
