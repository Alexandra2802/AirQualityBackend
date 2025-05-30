const express = require('express');
const cors = require('cors');
const measurementsRoutes = require('./routes/measurements');
const regionsRoutes = require('./routes/regions');
const pollutantRoutes = require('./routes/pollutants');
const heatmapRoutes = require ("./routes/heatmap.js");
const animatedHeatmapRoutes = require('./routes/animatedheatmap.js')
const countyRoutes = require("./routes/counties");
const animatedCentroidRoutes = require("./routes/animatedCentroid.js");
const impactRoutes = require("./routes/impact");

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/measurements', measurementsRoutes);
app.use('/api/regions', regionsRoutes);
app.use('/api/pollutants', pollutantRoutes);
app.use('/api/heatmap', heatmapRoutes);
app.use('/api/animated-heatmap', animatedHeatmapRoutes);
app.use("/api", heatmapRoutes);
app.use("/api", countyRoutes);
app.use("/api", animatedCentroidRoutes);
app.use("/api", impactRoutes);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
