import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WordCloud from "react-d3-cloud";
import API from "../api";
import { schemeCategory10 } from "d3-scale-chromatic";

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
    <div
        style={{
            height: "100vh",
            overflow: "hidden",
            padding: "2rem",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
        }}
    >
        <h2 style={{ marginBottom: "1rem" }}>Nuvem do grupo: {groupName}</h2>
        <div
            style={{
                flex: 1,
                position: "relative",
            }}
        >
            {words.length > 0 ? (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                >
                    <WordCloud
                        width={window.innerWidth - 64} // 64 = 2rem * 2 padding
                        height={window.innerHeight - 150} // deixar espaço para título
                        data={words}
                        fontSize={(word) => Math.min(Math.max(word.value * 10, 14), 60)}
                        spiral="archimedean"
                        rotate={0}
                        fill={(d, i) => schemeCategory10[i % 10]}
                    />
                </div>
            ) : (
                <p>Nenhuma palavra ainda</p>
            )}
        </div>
    </div>
);

}

export default GroupCloud;