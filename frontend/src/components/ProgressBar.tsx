type ProgressBarProps = {
    completedCount: number;
    totalCount: number;
};

export default function ProgressBar({
    completedCount,
    totalCount,
}: ProgressBarProps) {
    const progressPercent =
        totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

    return (
        <div className="mt-12">
            <div className="flex justify-between text-sm font-semibold mb-3">
                <span className="text-[#8aad8a]">Survival Progress</span>
                <span className="text-[#ff9b76]">
                    {completedCount} / {totalCount} Completed
                </span>
            </div>

            <div className="w-full h-2 bg-[#162236] rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#ffa37f] rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>
        </div>
    );
}