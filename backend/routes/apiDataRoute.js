import express from "express";

import getPosts from "../controllers/apiData.js";

const apiDataRouter = express.Router();

apiDataRouter.get("/blogs", getPosts);

export default apiDataRouter;
