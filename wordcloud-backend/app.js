const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Importar rotas
const groupRoutes = require("./routes/groups");
const wordRoutes = require("./routes/words");

app.use("/groups", groupRoutes);
app.use("/words", wordRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));