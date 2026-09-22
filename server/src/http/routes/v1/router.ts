import {Router} from "express";
export const v1Router = Router();

v1Router.get("/", (req, res) => {
    console.log("Welcome to the Version One APIs Page.")
})

v1Router.get("/health", (req, res) => {
    console.log("Health Checkup: 100%")
})