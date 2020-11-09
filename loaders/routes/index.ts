import type { DataLoader } from "@remix-run/core";
// import { MyEntity } from "../../server";
let loader: DataLoader = async () => {
  console.log("when importing");
  console.log('import { MyEntity } from "../../server"');
  console.log("this won't build anymore");
  return {
    message: "this is awesome 😎",
  };
};

export = loader;
