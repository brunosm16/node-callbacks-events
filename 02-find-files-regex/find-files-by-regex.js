import { readdir } from "fs";
import { EventEmitter } from "events";

export class FindFilesByRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.directories = [];
  }

  pushDirectory(directory) {
    this.directories.push(directory);

    return this;
  }

  readDir(dir) {
    readdir(dir, "utf-8", (err, result) => {
      if (err) {
        return this.emit("error", err);
      }

      this.emit("reading", dir);

      result.forEach((element) => {
        const fileMatch = element.match(this.regex);

        if (fileMatch) this.emit("found", element);
      });
    });
  }

  findFiles() {
    for (const dir of this.directories) this.readDir(dir);
    return this;
  }
}
