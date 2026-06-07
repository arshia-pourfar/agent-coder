export interface Tool {
    name: string;
    execute(...args: any[]): Promise<string>;
}