const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const auth = require("../middleware/auth");

// Criar grupo
router.post("/", async (req, res) => {
    const { name, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
        "INSERT INTO groups (name, password) VALUES ($1, $2) RETURNING id",
        [name, hash]
    );
    res.json({ groupId: result.rows[0].id });
});

// Login grupo
router.post("/login", async (req, res) => {
    const { name, password } = req.body;
    const result = await pool.query("SELECT * FROM groups WHERE name = $1", [name]);
    const group = result.rows[0];
    if (!group) return res.status(404).json({ error: "Grupo não encontrado" });

    const match = await bcrypt.compare(password, group.password);
    if (!match) return res.status(401).json({ error: "Senha incorreta" });

    const token = jwt.sign({ groupId: group.id }, process.env.JWT_SECRET);
    res.json({ token });
});

// Editar grupo
router.put("/:id", auth, async (req, res) => {
    const { name, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await pool.query("UPDATE groups SET name = $1, password = $2 WHERE id = $3", [name, hash, req.params.id]);
    res.sendStatus(200);
});

// Deletar grupo
router.delete("/:id", auth, async (req, res) => {
    await pool.query("DELETE FROM groups WHERE id = $1", [req.params.id]);
    res.sendStatus(200);
});

module.exports = router