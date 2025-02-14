document.addEventListener("DOMContentLoaded", function () {
    fetch("http://127.0.0.1:5000/get_sentences")
        .then(response => response.json())
        .then(sentences => {
            let list = document.getElementById("sentenceList");
            list.innerHTML = ""; // Clear list before adding new data

            sentences.forEach(sentence => {
                let li = document.createElement("li");
                li.textContent = sentence;
                li.onclick = function () {
                    classifySentence(sentence);
                };
                list.appendChild(li);
            });
        });

    function classifySentence(sentence) {
        fetch("http://127.0.0.1:5000/classify_sentence", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sentence: sentence })
        })
        .then(response => response.json())
        .then(data => {
            if (data.label) {
                document.getElementById("result").innerText = `Label: ${data.label} (Confidence: ${data.confidence.toFixed(2)})`;
            } else {
                document.getElementById("result").innerText = "Error in classification.";
            }
        })
        .catch(error => console.error("Error:", error));
    }
});
