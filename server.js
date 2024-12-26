import express from "express";
import dbConnection from "./db/conn.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/auth/auth-routes.js";
import therapistRouter from "./routes/therapy/therapist-routes.js";
import questionnaireRouter from "./routes/therapy/questionnaire-routes.js";
import scheduleRouter from "./routes/therapy/schedule-routes.js";
import adminProductRouter from "./routes/admin/products-routes.js";
import shopProductsRouter from "./routes/shop/products-route.js";
import shopCartRouter from "./routes/shop/cart-routes.js";
import shopAddressRouter from "./routes/shop/address-route.js";
import shopOrderRouter from "./routes/paystack/paystack.js"
import adminOrderRouter from "./routes/admin/order-routes.js"
import { upload, imageUploadUtil } from "./helpers/cloudinary.js";

dotenv.config();

// Connect to the database
await dbConnection();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.options("*", cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", userRouter);
app.use("/api/therapists", therapistRouter);
app.use("/api/question", questionnaireRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);

// Base route
app.get('/', (req, res) => {
  res.send('Paystack Integration API is running');
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
