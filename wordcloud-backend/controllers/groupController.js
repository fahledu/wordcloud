const db = require("../db");

// Listar todos os grupos
const listGroups = async (req, res) => {
    const result = await db.query("SELECT * FROM groups ORDER BY id DESC");
    res.json(result.rows);
}

// Criar novo grupo
const newGroup = async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Nome é obrigatório" });

    await db.query("INSERT INTO groups (name) VALUES ($1)", [name]);
    res.status(201).json({ message: "Grupo criado" });
}

// Editar grupo
const editGroup = async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Nome é obrigatório" });

    await db.query("UPDATE groups SET name = $1 WHERE id = $2", [name, req.params.id]);
    res.status(200).json({ message: "Grupo atualizado" });
}

// Deletar grupo
const deleteGroup = async (req, res) => {
    await db.query("DELETE FROM groups WHERE id = $1", [req.params.id]);
    res.sendStatus(204);
}

module.exports = { listGroups, newGroup, editGroup, deleteGroup }