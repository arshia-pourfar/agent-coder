export class WorkspaceManager {
    private root: string;

    constructor(root: string) {
        this.root = root;
    }

    getRoot(): string {
        return this.root;
    }

    setRoot(root: string) {
        this.root = root;
    }
}