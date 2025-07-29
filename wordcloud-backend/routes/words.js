const express = require("express");
const router = express.Router();
const pool = require("../db");

// Adicinar palavras as grupo (publico)
router.post("/:groupName", async (req, res) => {
    const { word } = req.body;
    const group = await pool.query("SELECT id FROM groups WHERE name = $1", [req.params.groupName]);
    if (!group.rows.length) return res.status(404).json({ error: "Grupo não encontrado" });

    await pool.query("INSERT INTO words (group_id, word) VALUES ($1, $2)", [group.rows[0].id, word]);
    res.sendStatus(201);
})

// Buscar palavras do grupo
router.get("/:groupName", async (req, res) => {
    const group = await pool.query("SELECT id FROM groups WHERE name = $1", [req.params.groupName]);
    if (!group.rows.length) return res.status(404).json({ error: "Grupo não encontrado" });

    const words = await pool.query("SELECT word FROM words WHERE grouo_id = $1", [group.rows[0].id]);
    res.json(words.rows);
});

module.exports = router;