import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Diary from "../components/Diary";
import { NavLink } from "react-router-dom";

export default function Journal(){
    const [quote, setQuote] = useState("Make sure you live.");
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;
        fetch("http://localhost:3000/quote", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setQuote(data.text))
            .catch(() => {});
    }, []);

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const res = await fetch("http://localhost:3000/quote", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text: editText }),
            });
            if (res.ok) {
                const data = await res.json();
                setQuote(data.text);
            }
        } catch {}
        setIsEditing(false);
    };

    return(
        <div className=" min-h-screen">
            <Navbar/>

            {/* project name */}
            <img src="public/projectname.svg" alt="" className="w-[300px] md:w-[400px] xl:hidden"/>

            {/* dubmy */}
            <div className="h-[63.68px] hidden xl:block"></div>

            <div className="flex flex-col justify-center items-center">
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
                                onClick={() => { setEditText(quote); setIsEditing(true); }}
                                className="absolute bottom-[10px] right-[10px] bg-white/30 hover:bg-white/50 rounded-full p-[6px]"
                            >
                                <img src="public/edit.svg" alt="edit" className="w-[16px] h-[16px] md:w-[20px] md:h-[20px]"/>
                            </button>
                        )}
                    </div>

                    {/* add button */}
                    <NavLink to = "/adddiary" className="flex flex-row justify-center items-center bg-[#81C784] w-[128px] h-[36px] text-[14px] text-white rounded-[8px] gap-2 md:w-[171px] md:h-[44px] md:gap-4">
                        <img src="public/pencil.svg" alt="pencil" className="w-[10px] h-[10px] md:w-[14px] md:h-[14px]"/>
                        ADD DIARY
                    </NavLink>
                </div>

                {/* display diary */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-[20px] gap-[10px]">
                    <Diary/>
                    <Diary/>
                    <Diary/>
                    <Diary/>
                </div>
            </div>
        </div>
    );
}