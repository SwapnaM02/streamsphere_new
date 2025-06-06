import express from "express";

import { getSimilarTvs,
	getTrendingTv,
	getTvDetails,
	getTvsByCategory,
	getTvTrailers,} from "../controllers/tv.controller.js";

const router=express.Router();
router.get("/trending", getTrendingTv);
router.get("/:id/trailers",getTvTrailers);
router.get("/:id/details",getTvDetails);
router.get("/:id/similar",getSimilarTvs);
// categories are top rated,now playing,popular movies
router.get("/:category",getTvsByCategory);

export default router;