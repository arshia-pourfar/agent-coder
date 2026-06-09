import type { AgentMemoryItem } from "../agentEngine";

export class MemoryStore {

    private items: AgentMemoryItem[] = [];

    add(item: AgentMemoryItem) {
        this.items.push(item);
    }

    getAll(): AgentMemoryItem[] {
        return this.items;
    }

    getLast(count: number): AgentMemoryItem[] {
        return this.items.slice(-count);
    }
}