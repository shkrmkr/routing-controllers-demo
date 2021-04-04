import express from "express";
import "reflect-metadata";
import { useExpressServer } from "routing-controllers";
import { createConnection } from "typeorm";

const app = express();

useExpressServer(app, {
  routePrefix: "/api",
  controllers: [__dirname + "/**/*.controller.ts"],
});

createConnection()
  .then(() => {
    app.listen(3000, () =>
      console.log(`Connected to Postgres.\nServer running on port 3000.`)
    );
  })
  .catch((err) => console.log(err));
