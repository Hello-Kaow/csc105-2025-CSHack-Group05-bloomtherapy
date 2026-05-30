import type { BucketItem } from "../types/bucket";

type BucketEditPopupProps = {
    selectedItem: BucketItem;
    editTitle: string;
    editDescription: string;
    editAchievedDay: string;
    editTag: string;
    setEditTitle: (value: string) => void;
    setEditDescription: (value: string) => void;
    setEditAchievedDay: (value: string) => void;
    setEditTag: (value: string) => void;
    onSave: () => void;
    onDelete: () => void;
    onClose: () => void;
};

export default function BucketEditPopup({
    selectedItem,
    editTitle,
    editDescription,
    editAchievedDay,
    editTag,
    setEditTitle,
    setEditDescription,
    setEditAchievedDay,
    setEditTag,
    onSave,
    onDelete,
    onClose,
}: BucketEditPopupProps) {
    return (
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
                            onChange={(e) => setEditAchievedDay(e.target.value)}
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
                            onChange={(e) => setEditDescription(e.target.value)}
                            rows={4}
                            className="mt-2 w-full border border-gray-200 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-[#a8c4af]"
                            placeholder="Optional description..."
                        />
                    </div>
                )}

                <div className="mt-6 flex justify-between gap-3">
                    <button
                        onClick={onDelete}
                        className="px-5 py-3 rounded-lg bg-red-100 text-red-600 font-bold hover:bg-red-200 transition"
                    >
                        Delete
                    </button>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-3 rounded-lg bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onSave}
                            className="px-5 py-3 rounded-lg bg-[#8aad8a] text-white font-bold hover:bg-[#7f9f87] transition"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}