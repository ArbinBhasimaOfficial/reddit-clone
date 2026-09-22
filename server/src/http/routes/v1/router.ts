import { Router } from "express";
export const v1Router = Router();

v1Router.get("/", (req, res) => {
  const msg = "Welcome to the Version One APIs Page."
  console.log(msg);
  res.send(msg);
});

v1Router.get("/health", (req, res) => {
  const msg = "Player One Health: 100%";
  console.log(msg);
  res.send(msg)
});
