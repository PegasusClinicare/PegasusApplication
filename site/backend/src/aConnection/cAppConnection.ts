import express from "express";

import morganMiddleware from "morgan";
import corsMiddleware from "cors";
import bodyParserMiddleware from "body-parser";
import cookieParserMiddleware from "cookie-parser";
import compressionMiddleware from "compression";

import errorMiddleware from "../bLove/bMiddleware/aErrorMiddleware";

import { userRouter } from "../bLove/aMCR/cRoute/bUserAdministration/aUserRoute";
import { roleRouter } from "../bLove/aMCR/cRoute/bUserAdministration/bRoleRoute";
import { menuRouter } from "../bLove/aMCR/cRoute/bUserAdministration/cMenuRoute";

import { organizationRouter } from "../bLove/aMCR/cRoute/dPegasusMain/aOrganizationRoute";
import { licenseRouter } from "../bLove/aMCR/cRoute/dPegasusMain/bLicenseRoute";
import { serviceRouter } from "../bLove/aMCR/cRoute/dPegasusMain/cServiceRoute";
import { documentRouter } from "../bLove/aMCR/cRoute/dPegasusMain/dDocumentRoute";
import { inspectionRouter } from "../bLove/aMCR/cRoute/dPegasusMain/eInspectionRoute";
import { enrolledServiceRouter } from "../bLove/aMCR/cRoute/dPegasusMain/fEnrolledServiceRoute";

import { singleImageRouter } from "../bLove/aMCR/cRoute/zFreestyleSample/aSingleImageRoute";

const appConnection = express();

// Third Party Middleware
appConnection.use(morganMiddleware("dev"));
appConnection.use(
  corsMiddleware({
    origin:
      process.env.ENVIRONMENT === "Production"
        ? ["http://13.60.80.5:8080"]
        : process.env.ENVIRONMENT === "Practice"
        ? [
            "https://pegasus-practice.netlify.app",
            "https://app.pegasusclinicare.com",
          ]
        : process.env.ENVIRONMENT === "Development"
        ? ["http://localhost:5173", "http://localhost:5174"]
        : "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
appConnection.use(bodyParserMiddleware.urlencoded({ extended: true }));
appConnection.use(bodyParserMiddleware.json());
appConnection.use(cookieParserMiddleware());
appConnection.use(compressionMiddleware());

// Routing Middleware
appConnection.use("/api/v1/user/", userRouter);
appConnection.use("/api/v1/role/", roleRouter);
appConnection.use("/api/v1/menu/", menuRouter);

appConnection.use("/api/v1/organization/", organizationRouter);
appConnection.use("/api/v1/license/", licenseRouter);
appConnection.use("/api/v1/service/", serviceRouter);
appConnection.use("/api/v1/document/", documentRouter);
appConnection.use("/api/v1/inspection/", inspectionRouter);
appConnection.use("/api/v1/enrolled-service/", enrolledServiceRouter);

appConnection.use("/api/v1/single-image/", singleImageRouter);

// Error Middleware
appConnection.use(errorMiddleware);

// Connect Frontend (For AWS Deployment)
// appConnection.use(express.static(path.join(_dirname, "../frontend/dist")))
// appConnection.get("*", (_, response) => {
//   response.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
// })

export default appConnection;
