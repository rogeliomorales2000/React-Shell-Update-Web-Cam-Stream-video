const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 3000;

// Proxy endpoint
app.get("/remote-config", async (req, res) => {
  try {
    const response = await fetch("https://pub-ent-usea2-17-t.trouter.teams.microsoft.com/v4/c?tc=%7B%22cv%22:%222025.46.01.1%22,%22ua%22:%22TeamsCDL%22,%22hr%22:%22%22,%22v%22:%221415/25113001312%22%7D&timeout=40&epid=86ef792f-e4ae-477e-a84a-8ea012d82473&ccid=&cor_id=39af754f-6aa9-4cd3-8cbe-3a134da9dc01&con_num=1766108309562_0");
    const text = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(text);
  } catch (err) {
    res.status(500).send("Erro ao buscar config remota");
  }
});

// Servir SPA
app.use(express.static("."));

app.listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:" + PORT);
});

