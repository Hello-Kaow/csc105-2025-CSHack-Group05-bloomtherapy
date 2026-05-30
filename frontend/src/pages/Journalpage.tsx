import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Diary from "../components/Diary";
import { NavLink } from "react-router-dom";
import { journalApi, type Diary as DiaryType } from "../apis/journalApi";
import { quoteApi } from "../apis/quoteApi";
import LoginRequiredPopup from "../components/LoginRequiredPopup";

export default function Journal(){
    const [quote, setQuote] = useState("Make sure you live.");
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState("");
    const [diaries, setDiaries] = useState<DiaryType[]>([]);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const isLoggedIn = () => !!localStorage.getItem("token");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        quoteApi.getQuote()
            .then((data) => setQuote(data.text))
            .catch(() => {});

        journalApi.getDiaries()
            .then((data) => setDiaries(data))
            .catch(() => {});
    }, []);

    const handleSave = async () => {
        try {
            const data = await quoteApi.updateQuote(editText);
            setQuote(data.text);
        } catch {}
        setIsEditing(false);
    };

    const handleDelete = async (id: string) => {
        try {
            await journalApi.deleteDiary(id);
            setDiaries((prev) => prev.filter((d) => d.id !== id));
        } catch {}
    };

    return(
        <div className="min-h-screen">
            <Navbar/>

            {/* project name */}
            <img src="public/projectname.svg" alt="" className="w-[300px] md:w-[400px] xl:hidden"/>

            {/* dummy height — space below top navbar on desktop */}
            <div className="h-[63.68px] hidden xl:block"></div>

            <div className="flex flex-col justify-center items-center lg:ml-52 lg:w-[calc(100%-208px)]">
                <div className="flex flex-col justify-center items-start mt-[20px] gap-[20px]">

                    {/* view — image with quote overlay */}
                    <div className="relative w-[358px] md:w-[704px] xl:w-[891px]">
                        <img src="public/photoview.svg" alt="view" className="w-full rounded-[16px]"/>

                        {/* quote text */}
                        {!isEditing ? (
                            <p className="absolute inset-0 flex items-center justify-center text-white font-serif text-[18px] md:text-[28px] xl:text-[36px] text-center px-[20px] drop-shadow-lg">
                                {quote}
                            </p>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center px-[20px] gap-2">
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                                    className="w-full text-center bg-white/80 rounded-[8px] px-[10px] py-[6px] text-[16px] md:text-[20px] outline-none"
                                    autoFocus
                                    maxLength={100}
                                />
                                <div className="flex gap-2">
                                    <button onClick={handleSave} className="bg-[#81C784] text-white text-[12px] md:text-[14px] px-3 py-1 rounded-[6px]">Save</button>
                                    <button onClick={() => setIsEditing(false)} className="bg-gray-400 text-white text-[12px] md:text-[14px] px-3 py-1 rounded-[6px]">Cancel</button>
                                </div>
                            </div>
                        )}

                        {/* edit button */}
                        {!isEditing && (
                            <button
                                onClick={() => {
                                    if (!isLoggedIn()) { setShowLoginPopup(true); return; }
                                    setEditText(quote); setIsEditing(true);
                                }}
                                className="absolute bottom-[10px] right-[10px] bg-white/30 hover:bg-white/50 rounded-full p-[6px]"
                            >
                                <img src="public/edit.svg" alt="edit" className="w-[16px] h-[16px] md:w-[20px] md:h-[20px]"/>
                            </button>
                        )}
                    </div>

                    {/* add button */}
                    <button
                        onClick={() => {
                            if (!isLoggedIn()) { setShowLoginPopup(true); return; }
                            window.location.href = "/adddiary";
                        }}
                        className="flex flex-row justify-center items-center bg-[#81C784] w-[128px] h-[36px] text-[14px] text-white rounded-[8px] gap-2 md:w-[171px] md:h-[44px] md:gap-4"
                    >
                        <img src="public/pencil.svg" alt="pencil" className="w-[10px] h-[10px] md:w-[14px] md:h-[14px]"/>
                        ADD DIARY
                    </button>
                </div>

                {/* display diary */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-[20px] gap-[10px]">
                    {diaries.map((diary) => (
                        <Diary key={diary.id} diary={diary} onDelete={handleDelete} />
                    ))}
                </div>
            </div>

            <LoginRequiredPopup
                isOpen={showLoginPopup}
                onClose={() => setShowLoginPopup(false)}
            />
        </div>
    );
}