import { Router } from "express";
export const v2Router = Router();

v2Router.get("/", (req, res) => {
  const msg = "Welcome to the Version Two APIs Page."
  console.log(msg);
  res.send(msg);
});

v2Router.get("/health", (req, res) => {
  const msg = "Player Two Health: 100%";
  console.log(msg);
  res.send(msg)
});
