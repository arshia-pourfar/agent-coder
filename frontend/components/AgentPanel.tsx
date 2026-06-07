interface AgentPanelProps {
    state: "idle" | "planning" | "executing" | "observing";
}

export default function AgentPanel({ state }: AgentPanelProps) {
    return (
        <div className="w-80 bg-panel border-l border-app p-4">
            <h2 className="text-sm text-muted">Agent Status</h2>
            <div className="glass p-3 rounded mt-2">
                State: <span className="font-bold">{state}</span>
            </div>
        </div>
    );
}