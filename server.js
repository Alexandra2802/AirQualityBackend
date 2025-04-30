const express = require('express');
const cors = require('cors');
const measurementsRoutes = require('./routes/measurements');
const regionsRoutes = require('./routes/regions');
const pollutantRoutes = require('./routes/pollutants');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/measurements', measurementsRoutes);
app.use('/api/regions', regionsRoutes);
app.use('/api/pollutants', pollutantRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
