import { Router } from "express";

export const v2Router = Router();

// Terminal handler: ends the chain by responding.
v2Router.get("/", (_req, res) => {
  res.send("Version Two API Page.");
});
