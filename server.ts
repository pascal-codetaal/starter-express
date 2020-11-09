import "reflect-metadata";
import {
  createConnection,
  Entity,
  BaseEntity,
} from "typeorm";
import { PrimaryGeneratedColumn, Column } from "typeorm";

const express = require("express");
const morgan = require("morgan");
const { createRequestHandler } = require("@remix-run/express");

@Entity()
export class MyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;
}

createConnection({
  type: "sqlite",
  database: "test.sqlite",
  // dropSchema: true,
  entities: [MyEntity],
  synchronize: true,
  logging: false
});

let app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static("public"));

app.get(
  "*",
  createRequestHandler({
    getLoadContext() {
      // Whatever you return here will be passed as `context` to your loaders.
    },
  })
);

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server started on http://localhost:${port}`);
});
