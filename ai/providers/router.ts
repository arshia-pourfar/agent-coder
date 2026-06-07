import { OllamaProvider } from "./ollama";
import { OpenAIProvider } from "./openai";

export type ProviderType = "ollama" | "openai";

export class LLMRouter {
    static get(type: ProviderType) {
        switch (type) {
            case "ollama":
                return new OllamaProvider();
            case "openai":
                return new OpenAIProvider();
            default:
                throw new Error("Unknown provider");
        }
    }
}