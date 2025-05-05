import express from "express";
import { searchMovie,searchPerson,searchTv,getSearchHistory,removeItemFromSearchHistory } from "../controllers/search.controller.js";

const router=express.Router();

// query would be name of the person,actor like aaron paul. we will be searching that person from database.
router.get("/person/:query",searchPerson);
router.get("/movie/:query",searchMovie);
router.get("/tv/:query",searchTv);
router.get("/history",getSearchHistory);
router.delete("/history/:id",removeItemFromSearchHistory);

export default router;