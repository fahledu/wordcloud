import { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [groups, setGroups] = useState([]);
    const [newGroup, setNewGroup] = useState({ name: "", password: "" });
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const createGroup = async () => {
        try {
            await API.post("/groups", newGroup, { headers });
            setNewGroup({ name: "", password: "" });
            alert("Grupo criado com sucesso!");
        } catch (err) {
            alert("Erro ao criar grupo")
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div>
            <h2>Painel de grupos</h2>
            <button onClick={logout}>Sair</button>
            <h3>Criar novo grupo</h3>
            <input
                placehoder="Nome"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
            />
            <input
                placeholder="Senha"
                type="password"
                value={newGroup.password}
                onChange={(e) => setNewGroup({ ...newGroup, password: e.target.value })}
            />
            <button onClick={createGroup}>Criar grupo</button>
        </div>
    )
}

export default Dashboard;