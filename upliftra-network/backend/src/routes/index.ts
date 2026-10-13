import { Router } from "express";
import healthRoutes from "./healthRoutes.js";
import aiRoutes from "./aiRoutes.js";

const apiRouter = Router();

apiRouter.use("/", healthRoutes);
apiRouter.use("/", aiRoutes);

export default apiRouter;
