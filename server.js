import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import client, { register } from "prom-client";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

// configure monitoring
register.setDefaultLabels({
    app: "E-commerce backend"
});

client.collectDefaultMetrics({ register });

const metricsHandler = async (req, res) => {
    res.writeHead(200, { "Content-Type": register.contentType });
    register.metrics().then((data) => res.end(data));
    return;
}

// configure env
dotenv.config();

//database config
connectDB();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// register metric collection
app.get("/metrics", metricsHandler);        // monitoring

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api

app.get('/', (req,res) => {
    res.send("<h1>Welcome to ecommerce app</h1>");
});

const PORT = process.env.PORT || 6060;

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
});