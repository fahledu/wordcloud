import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function LoginPage() {
    const [name, setName] = useState("");
    const [password, setPassword] = use("");
    const navigate = useNavigate();

    const login = async () => {
        try {
            const res = await API.post("groups/login", { name, password });
            localStorage.setItem("token", res.data.token);
            navigate("dashboard");
        } catch (err) {
            alert("Erros ao fazer login. Nome ou senha invalidos");
        }
    };

    return (
        <div>
            <h2>Login do Grupo</h2>
            <input
                placeholder="Nome do grupo"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={login}>Entrar</button>
        </div>
    );
}

export default LoginPage;