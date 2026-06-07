const API_URL = "/api/agent";

export default async function fetchAgent(prompt: string): Promise<string> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    return data.response;
  } catch (err) {
    console.error(err);
    return "Error connecting to the agent.";
  }
}