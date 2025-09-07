const db = require("../db");

// Adicinar palavras as grupo (publico)
const addNewWord = async (req, res) => {
    const { word } = req.body;
    const group = await db.query("SELECT id FROM groups WHERE name = $1", [req.params.groupName]);
    if (!group.rows.length) return res.status(404).json({ error: "Grupo não encontrado" });

    await db.query("INSERT INTO words (group_id, word) VALUES ($1, $2)", [group.rows[0].id, word]);
    res.sendStatus(201);
}

// Buscar palavras do grupo
const getWords = async (req, res) => {
    const group = await db.query("SELECT id FROM groups WHERE name = $1", [req.params.groupName]);
    if (!group.rows.length) return res.status(404).json({ error: "Grupo não encontrado" });

    const words = await db.query("SELECT word FROM words WHERE group_id = $1", [group.rows[0].id]);
    res.json(words.rows);
}

module.exports = {addNewWord, getWords}