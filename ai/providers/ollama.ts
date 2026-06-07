export class OllamaProvider {
    async chat(messages: any[]) {
        const res = await fetch("http://localhost:11434/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "qwen2.5-coder",
                messages,
                stream: false
            })
        });

        const data = await res.json();
        return data.message.content;
    }
}