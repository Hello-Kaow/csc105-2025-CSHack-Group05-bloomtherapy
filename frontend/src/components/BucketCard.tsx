import type { BucketItem } from "../types/bucket";

type BucketCardProps = {
    item: BucketItem;
    onToggle: (id: BucketItem["id"]) => void;
    onOpen: (item: BucketItem) => void;
};

export default function BucketCard({
    item,
    onToggle,
    onOpen,
}: BucketCardProps) {
    return (
        <div
            onClick={() => onOpen(item)}
            className={`cursor-pointer rounded-xl p-6 min-h-32 overflow-hidden transition hover:scale-[1.02] hover:shadow-md
                ${
                    item.completed
                        ? "bg-[#f3f8ed] border border-[#ffb999]/60 shadow-[0_0_18px_rgba(255,155,118,0.15)]"
                        : "bg-[#a8c4af] text-white shadow-sm"
                }
            `}
        >
            <div className="flex items-start gap-4 min-w-0">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle(item.id);
                    }}
                    className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-1
                        ${
                            item.completed
                                ? "bg-white border-[#b6c9b7] text-[#8aad8a]"
                                : "border-white/60"
                        }
                    `}
                    aria-label="Toggle bucket completion"
                >
                    {item.completed && "✓"}
                </button>

                <div className="min-w-0 flex-1">
                    <h3
                        className={`text-lg font-bold break-words [overflow-wrap:anywhere] ${
                            item.completed
                                ? "text-[#263147] line-through"
                                : "text-white"
                        }`}
                    >
                        {item.title}
                    </h3>

                    {item.completed && item.achievedDay && (
                        <p className="mt-3 text-sm font-semibold text-[#ff9b76] break-words [overflow-wrap:anywhere]">
                            Achieved Day {item.achievedDay}
                        </p>
                    )}

                    {!item.completed && item.description && (
                        <p className="mt-4 text-sm leading-relaxed text-white/90 break-words [overflow-wrap:anywhere]">
                            {item.description}
                        </p>
                    )}

                    {item.tag && (
                        <span
                            className={`inline-block max-w-full mt-4 text-xs font-bold px-3 py-1 rounded whitespace-normal break-words [overflow-wrap:anywhere] ${
                                item.completed
                                    ? "bg-[#d9ead3] text-[#7fa17d]"
                                    : "bg-[#8daa96] text-white"
                            }`}
                        >
                            ⊙ {item.tag}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}