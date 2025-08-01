import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WordCloud from "react-d3-cloud";
import API from "../api";

function GroupCloud() {
    const { groupName } = useParams();
    const [words, setWords] = useState([]);

    useEffect(() => {
        const fetchWords = async () => {
            const res = await API.get(`/words/${groupName}`);
          const formatted = res.data.reduce((acc, curr) => {
                const existing = acc.find((item) => item.text === curr.word);
                if (existing) {
                    existing.value += 1;
                } else {
                    acc.push({ text: curr.word, value: 1 });
                }
                return acc;
            }, []);
            setWords(formatted);
        };

        fetchWords();

        const interval = setInterval(fetchWords, 5000);
        return () => clearInterval(interval);
    }, [groupName]);

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Nuvem do grupo: {groupName}</h2>
            {words.length > 0 ? (
                <div style={{ height: 400, width: "100%" }}>
                    <WordCloud data={words}
                        fontSize={(word) => word.value * 10}
                        spiral="archimedean"
                        rotate={0}
                    />
                </div>
            ) : (
                <p>Nenhuma palavra ainda</p>
            )}
        </div>
    );
}

export default GroupCloud;