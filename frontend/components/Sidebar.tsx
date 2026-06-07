export default function Sidebar() {
    return (
        <div className="w-64 bg-panel border-r border-app p-4">
            <h2 className="text-sm text-muted mb-4">Projects</h2>

            <div className="space-y-2">
                <div className="glass p-2 rounded cursor-pointer">
                    New Agent Session
                </div>
            </div>
        </div>
    );
}