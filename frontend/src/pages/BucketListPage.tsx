import { useEffect, useRef, useState } from "react";
import { bucketApi } from "../apis/bucketApi";
import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";
import BucketCard from "../components/BucketCard";
import BucketEditPopup from "../components/BucketEditPopup";
import LoginRequiredPopup from "../components/LoginRequiredPopup";
import type { BucketItem } from "../types/bucket";

const AUTH_TOKEN_KEY = "token";

export default function BucketList() {
    const bucketInputRef = useRef<HTMLInputElement>(null);

    const [bucketItems, setBucketItems] = useState<BucketItem[]>([]);
    const [newBucket, setNewBucket] = useState("");
    const [selectedItem, setSelectedItem] = useState<BucketItem | null>(null);

    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editAchievedDay, setEditAchievedDay] = useState("");
    const [editTag, setEditTag] = useState("");

    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const isLoggedIn = () => {
        return !!localStorage.getItem(AUTH_TOKEN_KEY);
    };

    const requireLogin = () => {
        if (!isLoggedIn()) {
            setShowLoginPopup(true);
            return false;
        }

        return true;
    };

    useEffect(() => {
        const loadBuckets = async () => {
            if (!isLoggedIn()) return;

            try {
                const buckets = await bucketApi.getBuckets();
                setBucketItems(buckets);
            } catch (error) {
                console.error("Failed to load buckets:", error);
            }
        };

        loadBuckets();
    }, []);

    const completedCount = bucketItems.filter((item) => item.completed).length;
    const totalCount = bucketItems.length;

    const addBucket = async () => {
        if (!requireLogin()) return;
        if (!newBucket.trim()) return;

        try {
            const createdBucket = await bucketApi.createBucket({
                title: newBucket.trim(),
                completed: false,
            });

            setBucketItems((prev) => [createdBucket, ...prev]);
            setNewBucket("");
        } catch (error) {
            console.error("Failed to add bucket:", error);
        }
    };

    const toggleCompleted = async (id: BucketItem["id"]) => {
        if (!requireLogin()) return;

        const itemToUpdate = bucketItems.find((item) => item.id === id);
        if (!itemToUpdate) return;

        try {
            const updatedBucket = await bucketApi.updateBucket(id, {
                completed: !itemToUpdate.completed,
                achievedDay: !itemToUpdate.completed
                    ? itemToUpdate.achievedDay || 1
                    : undefined,
            });

            setBucketItems((prev) =>
                prev.map((item) => (item.id === id ? updatedBucket : item))
            );
        } catch (error) {
            console.error("Failed to update bucket:", error);
        }
    };

    const openEditPopup = (item: BucketItem) => {
        if (!requireLogin()) return;

        setSelectedItem(item);
        setEditTitle(item.title);
        setEditDescription(item.description || "");
        setEditAchievedDay(String(item.achievedDay || 1));
        setEditTag(item.tag || "");
    };

    const saveEdit = async () => {
        if (!requireLogin()) return;
        if (!selectedItem || !editTitle.trim()) return;

        try {
            const updatedBucket = await bucketApi.updateBucket(selectedItem.id, {
                title: editTitle.trim(),
                description: selectedItem.completed ? undefined : editDescription,
                achievedDay: selectedItem.completed
                    ? Number(editAchievedDay) || 1
                    : undefined,
                tag: editTag.trim() ? editTag.trim().toUpperCase() : undefined,
                completed: selectedItem.completed,
            });

            setBucketItems((prev) =>
                prev.map((item) =>
                    item.id === selectedItem.id ? updatedBucket : item
                )
            );

            setSelectedItem(null);
        } catch (error) {
            console.error("Failed to save bucket:", error);
        }
    };

    const deleteBucket = async () => {
        if (!requireLogin()) return;
        if (!selectedItem) return;

        try {
            await bucketApi.deleteBucket(selectedItem.id);

            setBucketItems((prev) =>
                prev.filter((item) => item.id !== selectedItem.id)
            );

            setSelectedItem(null);
        } catch (error) {
            console.error("Failed to delete bucket:", error);
        }
    };

    const focusBucketInput = () => {
        if (!requireLogin()) return;
        bucketInputRef.current?.focus();
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
                        className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none z-0"
                    />

                    <div className="absolute inset-0 bg-white/65 pointer-events-none" />
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

                    <ProgressBar
                        completedCount={completedCount}
                        totalCount={totalCount}
                    />

                    {/* Add bucket */}
                    <div className="mt-12 bg-[#a8c4af] rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-4 items-center">
                        <input
                            ref={bucketInputRef}
                            value={newBucket}
                            onChange={(e) => setNewBucket(e.target.value)}
                            onFocus={() => {
                                if (!isLoggedIn()) {
                                    setShowLoginPopup(true);
                                    bucketInputRef.current?.blur();
                                }
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    addBucket();
                                }
                            }}
                            placeholder="What keeps you moving forward? (e.g. See the ocean again)"
                            className="w-full bg-transparent border-b border-white/60 outline-none text-white placeholder:text-white/90 py-2"
                        />

                        <button
                            type="button"
                            onClick={addBucket}
                            className="bg-[#8daa96] hover:bg-[#7f9f87] text-white font-bold px-8 py-3 rounded-md shadow transition whitespace-nowrap"
                        >
                            ADD BUCKET
                        </button>
                    </div>

                    {/* Bucket cards */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {bucketItems.map((item) => (
                            <BucketCard
                                key={item.id}
                                item={item}
                                onToggle={toggleCompleted}
                                onOpen={openEditPopup}
                            />
                        ))}

                        {/* Decorative add card */}
                        <button
                            type="button"
                            onClick={focusBucketInput}
                            className="rounded-xl border-2 border-dashed border-[#a8c4af]/60 p-6 min-h-32 flex flex-col items-center justify-center text-center text-[#8aad8a] hover:bg-[#f3f8ed] hover:border-[#8aad8a] transition"
                        >
                            <span className="text-2xl mb-2">🌱</span>
                            <span className="font-bold">Add another dream</span>
                            <span className="text-sm mt-1">
                                Keep moving forward.
                            </span>
                        </button>
                    </div>
                </section>

                {selectedItem && (
                    <BucketEditPopup
                        selectedItem={selectedItem}
                        editTitle={editTitle}
                        editDescription={editDescription}
                        editAchievedDay={editAchievedDay}
                        editTag={editTag}
                        setEditTitle={setEditTitle}
                        setEditDescription={setEditDescription}
                        setEditAchievedDay={setEditAchievedDay}
                        setEditTag={setEditTag}
                        onSave={saveEdit}
                        onDelete={deleteBucket}
                        onClose={() => setSelectedItem(null)}
                    />
                )}

                <LoginRequiredPopup
                    isOpen={showLoginPopup}
                    onClose={() => setShowLoginPopup(false)}
                    message="Please login first to save your bucket list."
                    loginPath="/login"
                />
            </main>
        </>
    );
}