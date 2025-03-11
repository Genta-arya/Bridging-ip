import express from "express";
import { CreateIP, GetIP, UpdateIP } from "../Controller/IPController.js";

export const Routes = express.Router();

Routes.get("/ip", GetIP);
Routes.post("/ip", CreateIP);
Routes.put("/ip", UpdateIP);
