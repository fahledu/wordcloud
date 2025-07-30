import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

function GroupView() {
    const { groupName } = useParams();
    const [ words, setWords ] = useState([]);
    const [newWord, setNewWord] = useState("");

    useEffect(() => {
        API.get(`/words/${groupName}`).then((res) => setWords(res.data));
    }, [groupName]);

    const submitWord = async () => {
        if (!newWord) return;
        await API.post(`/words/${groupName}`, { word: newWord });
        setNewWord("");
        const update = await API.get(`/words/${groupName}`);
        setWords(update.data);
    };

    return (
        <div>
            <h1>Nuvem do grupo: {groupName}</h1>
            <ul>
                {words.map((w, i) => (
                    <li key={i}>{w.word}</li>
                ))}
            </ul>

            <input value={newWord} onChange={(e) => setNewWord(e.target.value)} />
            <button onClick={submitWord}>Enviar palavra</button>
        </div>
    );
}

export default GroupView;