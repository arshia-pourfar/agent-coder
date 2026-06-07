export class MemoryStore {
    private memory: any[] = [];

    add(entry: any) {
        this.memory.push(entry);
    }

    getAll() {
        return this.memory;
    }

    getRecent(n = 5) {
        return this.memory.slice(-n);
    }
}