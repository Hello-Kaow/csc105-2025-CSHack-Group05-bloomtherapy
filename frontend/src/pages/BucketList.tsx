import { useRef, useState } from "react";
import Navbar from "../components/Navbar";

type BucketItem = {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    tag?: string;
    achievedDay?: number;
};

export default function BucketList() {
    const bucketInputRef = useRef<HTMLInputElement>(null);

    const [bucketItems, setBucketItems] = useState<BucketItem[]>([
        {
            id: 1,
            title: "Watch the sunrise without fear",
            completed: true,
            achievedDay: 380,
        },
        {
            id: 2,
            title: "Eat hot ramen",
            completed: true,
            achievedDay: 112,
        },
        {
            id: 3,
            title: "See the ocean again",
            completed: false,
            tag: "LONG JOURNEY",
        },
        {
            id: 4,
            title: "Find a working radio broadcast",
            description:
                "Need to scavenge copper wire and a power source. The silence is deafening.",
            completed: false,
        },
        {
            id: 5,
            title: "Plant a seed and watch it sprout",
            completed: false,
            tag: "BASE CAMP",
        },
    ]);

    const [newBucket, setNewBucket] = useState("");
    const [selectedItem, setSelectedItem] = useState<BucketItem | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editAchievedDay, setEditAchievedDay] = useState("");
    const [editTag, setEditTag] = useState("");

    const completedCount = bucketItems.filter((item) => item.completed).length;
    const totalCount = bucketItems.length;
    const progressPercent =
        totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

    const addBucket = () => {
        if (!newBucket.trim()) return;

        const newItem: BucketItem = {
            id: Date.now(),
            title: newBucket,
            completed: false,
        };

        setBucketItems([newItem, ...bucketItems]);
        setNewBucket("");
    };

    const toggleCompleted = (id: number) => {
        setBucketItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          completed: !item.completed,
                          achievedDay: !item.completed
                              ? item.achievedDay || 1
                              : undefined,
                      }
                    : item
            )
        );
    };

    const openEditPopup = (item: BucketItem) => {
        setSelectedItem(item);
        setEditTitle(item.title);
        setEditDescription(item.description || "");
        setEditAchievedDay(String(item.achievedDay || 1));
        setEditTag(item.tag || "");
    };

    const saveEdit = () => {
        if (!selectedItem || !editTitle.trim()) return;

        setBucketItems((prev) =>
            prev.map((item) =>
                item.id === selectedItem.id
                    ? {
                          ...item,
                          title: editTitle,
                          description: item.completed ? undefined : editDescription,
                          achievedDay: item.completed
                              ? Number(editAchievedDay) || 1
                              : undefined,
                          tag: editTag.trim()
                              ? editTag.trim().toUpperCase()
                              : undefined,
                      }
                    : item
            )
        );

        setSelectedItem(null);
    };

    const deleteBucket = () => {
        if (!selectedItem) return;

        setBucketItems((prev) =>
            prev.filter((item) => item.id !== selectedItem.id)
        );

        setSelectedItem(null);
    };

    return (
        <>
            <Navbar />

            <main className="relative min-h-screen bg-white lg:ml-52 px-8 md:px-16 lg:px-28 py-16 overflow-hidden">
    {/* Nature background */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
            src="/nature.avif"
            alt=""
            className="absolute top-0 right-0 h-full w-full object-cover opacity-[0.4]"
        />

        {/* Fade image into white */}
        <div className="absolute inset-0 bg-white/60" />
    </div>

    {/* Soft background decorations */}
    <div className="pointer-events-none absolute top-16 right-10 w-80 h-80 bg-[#a8c4af]/20 rounded-full blur-3xl" />
    <div className="pointer-events-none absolute bottom-20 right-40 w-56 h-56 bg-[#ff9b76]/10 rounded-full blur-3xl" />

                <section className="relative z-10 max-w-6xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#7fa17d]">
                        The Bucket List
                    </h1>

                    <p className="mt-4 max-w-3xl text-lg text-[#9ba3b8] leading-relaxed">
                        A manifestation of hope. Things to experience before the final
                        curtain, or things to rebuild for the next act.
                    </p>

                    {/* Quote decoration */}
                    <div className="mt-6 bg-[#f3f8ed] border border-[#dce8d6] rounded-xl px-5 py-4 max-w-2xl shadow-sm">
                        <p className="text-[#7fa17d] italic">
                            “Even small wishes can keep a heart alive.”
                        </p>
                    </div>

                    {/* Progress */}
                    <div className="mt-12">
                        <div className="flex justify-between text-sm font-semibold mb-3">
                            <span className="text-[#8aad8a]">
                                Survival Progress
                            </span>
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

                    {/* Add bucket */}
                    <div className="mt-12 bg-[#a8c4af] rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-4 items-center">
                        <input
                            ref={bucketInputRef}
                            value={newBucket}
                            onChange={(e) => setNewBucket(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") addBucket();
                            }}
                            placeholder="What keeps you moving forward? (e.g. See the ocean again)"
                            className="w-full bg-transparent border-b border-white/60 outline-none text-white placeholder:text-white/90 py-2"
                        />

                        <button
                            onClick={addBucket}
                            className="bg-[#8daa96] hover:bg-[#7f9f87] text-white font-bold px-8 py-3 rounded-md shadow transition whitespace-nowrap"
                        >
                            ADD BUCKET
                        </button>
                    </div>

                    {/* Bucket cards */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {bucketItems.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => openEditPopup(item)}
                                className={`cursor-pointer rounded-xl p-6 min-h-32 transition hover:scale-[1.02] hover:shadow-md
                                    ${
                                        item.completed
                                            ? "bg-[#f3f8ed] border border-[#ffb999]/60 shadow-[0_0_18px_rgba(255,155,118,0.15)]"
                                            : "bg-[#a8c4af] text-white shadow-sm"
                                    }
                                `}
                            >
                                <div className="flex items-start gap-4">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleCompleted(item.id);
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

                                    <div>
                                        <h3
                                            className={`text-lg font-bold ${
                                                item.completed
                                                    ? "text-[#263147] line-through"
                                                    : "text-white"
                                            }`}
                                        >
                                            {item.title}
                                        </h3>

                                        {item.completed && item.achievedDay && (
                                            <p className="mt-3 text-sm font-semibold text-[#ff9b76]">
                                                Achieved Day {item.achievedDay}
                                            </p>
                                        )}

                                        {!item.completed && item.description && (
                                            <p className="mt-4 text-sm leading-relaxed text-white/90">
                                                {item.description}
                                            </p>
                                        )}

                                        {item.tag && (
                                            <span
                                                className={`inline-block mt-4 text-xs font-bold px-3 py-1 rounded ${
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
                        ))}

                        {/* Decorative empty card */}
                        <button
                            onClick={() => bucketInputRef.current?.focus()}
                            className="rounded-xl border-2 border-dashed border-[#a8c4af]/60 p-6 min-h-32 flex flex-col items-center justify-center text-center text-[#8aad8a] hover:bg-[#f3f8ed] hover:border-[#8aad8a] transition"
                        >
                            <span className="text-2xl mb-2">🌱</span>
                            <span className="font-bold">
                                Add another dream
                            </span>
                            <span className="text-sm mt-1">
                                Keep moving forward.
                            </span>
                        </button>
                    </div>
                </section>

                {/* Edit/Delete popup */}
                {selectedItem && (
                    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center px-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-[#dce8d6]">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#7fa17d]">
                                        Edit Bucket
                                    </h2>

                                    <p className="text-sm text-gray-400 mt-1">
                                        Change your bucket list item or delete it.
                                    </p>
                                </div>

                                <div className="w-10 h-10 rounded-full bg-[#f3f8ed] flex items-center justify-center">
                                    🌸
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="text-sm font-semibold text-gray-600">
                                    Bucket title
                                </label>
                                <input
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#a8c4af]"
                                />
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-semibold text-gray-600">
                                    Tag
                                </label>
                                <input
                                    value={editTag}
                                    onChange={(e) => setEditTag(e.target.value)}
                                    className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#a8c4af]"
                                    placeholder="Example: Long Journey, Base Camp..."
                                />
                            </div>

                            {selectedItem.completed ? (
                                <div className="mt-4">
                                    <label className="text-sm font-semibold text-gray-600">
                                        Achieved Day
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={editAchievedDay}
                                        onChange={(e) =>
                                            setEditAchievedDay(e.target.value)
                                        }
                                        className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#a8c4af]"
                                        placeholder="Enter achieved day..."
                                    />
                                </div>
                            ) : (
                                <div className="mt-4">
                                    <label className="text-sm font-semibold text-gray-600">
                                        Description
                                    </label>
                                    <textarea
                                        value={editDescription}
                                        onChange={(e) =>
                                            setEditDescription(e.target.value)
                                        }
                                        rows={4}
                                        className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-[#a8c4af]"
                                        placeholder="Optional description..."
                                    />
                                </div>
                            )}

                            <div className="mt-6 flex justify-between gap-3">
                                <button
                                    onClick={deleteBucket}
                                    className="px-5 py-3 rounded-lg bg-red-100 text-red-600 font-bold hover:bg-red-200 transition"
                                >
                                    Delete
                                </button>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setSelectedItem(null)}
                                        className="px-5 py-3 rounded-lg bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        onClick={saveEdit}
                                        className="px-5 py-3 rounded-lg bg-[#8aad8a] text-white font-bold hover:bg-[#7f9f87] transition"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}