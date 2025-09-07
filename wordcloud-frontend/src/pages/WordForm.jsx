import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "../api";

function WordForm() {
    const { groupName } = useParams();
    const [word, setWord] = useState("");
    const [status, setStatus] = useState("");

    const handleSubit = async (e) => {
        e.preventDefault();
        if (!word) return;

        try {
            await API.post(`/words/${groupName}`, { word });
            setStatus("Palavra enviada com sucesso");
            setWord("");
        } catch {

            setStatus("Erro ao enviar palavra.")
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Enviar palavra para: {groupName}</h2>
            <form onSubmit={handleSubit}>
                <input type="text"
                    placeholder="Digite a palavra"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
}

export default WordForm;