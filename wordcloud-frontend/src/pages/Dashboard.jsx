import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState("");
  const [editGroup, setEditGroup] = useState(null);
  const [editName, setEditName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    const res = await API.get("/groups");
    setGroups(res.data);
  };

  const handleCreate = async () => {
    if (!newGroup.trim()) return;
    await API.post("/groups", { name: newGroup.trim() });
    setNewGroup("");
    loadGroups();
  };

  const handleDelete = async (id) => {
    await API.delete(`/groups/${id}`);
    loadGroups();
  };

  const handleEdit = async (id) => {
    if (!editName.trim()) return;
    await API.put(`/groups/${id}`, { name: editName.trim() });
    setEditGroup(null);
    setEditName("");
    loadGroups();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Dashboard</h2>
      <button onClick={logout}>Sair</button>

      <h3>Criar novo grupo</h3>
      <input
        type="text"
        placeholder="Nome do grupo"
        value={newGroup}
        onChange={(e) => setNewGroup(e.target.value)}
      />
      <button onClick={handleCreate}>Criar</button>

      <h3>Seus grupos</h3>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            {editGroup === group.id ? (
              <>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <button onClick={() => handleEdit(group.id)}>Salvar</button>
                <button onClick={() => setEditGroup(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <strong>{group.name}</strong>{" "}
                <button
                  onClick={() => {
                    setEditGroup(group.id);
                    setEditName(group.name);
                  }}
                >
                  Editar
                </button>
                <button onClick={() => handleDelete(group.id)}>Excluir</button>
                <button onClick={() => navigate(`/group/${group.name}`)}>
                  Ver Nuvem
                </button>
                <button onClick={() => navigate(`/group/${group.name}/submit`)}>
                  Enviar palavra
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;