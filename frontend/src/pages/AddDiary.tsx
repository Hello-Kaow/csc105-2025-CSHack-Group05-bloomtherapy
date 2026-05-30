import { useState } from "react";
import Navbar from "../components/Navbar";

export default function AddDiary(){
    const [title, setTitle] = useState("");
    const [story, setStory] = useState("");
    const [date, setDate] = useState("");
    const [errors, setErrors] = useState<{ title?: string; story?: string; date?: string }>({});
    const [submitError, setSubmitError] = useState("");

    const validate = () => {
        const newErrors: { title?: string; story?: string; date?: string } = {};
        if (!title.trim()) newErrors.title = "Title is required";
        if (!story.trim()) newErrors.story = "Diary content is required";
        if (!date) newErrors.date = "Date is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        setSubmitError("");
        if (!validate()) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3000/diary", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, story, date }),
            });

            if (!res.ok) {
                setSubmitError("Failed to add diary. Please try again.");
                return;
            }

            // clear form
            setTitle("");
            setStory("");
            setDate("");
            setErrors({});
        } catch {
            setSubmitError("Failed to add diary. Please try again.");
        }
    };

    return(
        <div className="min-h-screen flex flex-col">
            <Navbar/>

            {/* project name */}
            <img src="public/projectname.svg" alt="" className="w-[300px] md:w-[400px] xl:hidden"/>

            {/* Add diary section */}
            <div className="flex flex-col justify-center items-center flex-1">
                <div className="bg-[#E0E0E0] w-[359px] rounded-[10px] md:w-[440px]">
                    <div className="text-[16px] mx-[20px] mt-[20px] md:text-[20px]">
                        Title
                    </div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-white w-[319px] h-[25px] rounded-[5px] border-1 mx-[20px] px-[10px] text-[16px] md:w-[400px] md:h-[40px]"
                    />
                    {errors.title && <ul className="list-disc mx-[40px] mt-[4px]"><li className="text-red-500 text-[12px] font-bold">{errors.title}</li></ul>}

                    <div className="text-[16px] mx-[20px] mt-[20px] md:text-[20px]">
                        Diary
                    </div>
                    <textarea
                        value={story}
                        onChange={(e) => setStory(e.target.value)}
                        className="bg-white w-[319px] h-[100px] rounded-[5px] border-1 mx-[20px] px-[10px] text-[16px] md:w-[400px] md:h-[100px] resize-none"
                    />
                    {errors.story && <ul className="list-disc mx-[40px] mt-[4px]"><li className="text-red-500 text-[12px] font-bold">{errors.story}</li></ul>}

                    <div className="text-[16px] mx-[20px] mt-[20px] md:text-[20px]">
                        Date
                    </div>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-white w-[319px] h-[25px] rounded-[5px] px-[10px] border-1 mx-[20px] text-[16px] md:w-[400px] md:h-[40px]"
                    />
                    {errors.date && <ul className="list-disc mx-[40px] mt-[4px]"><li className="text-red-500 text-[12px] font-bold">{errors.date}</li></ul>}

                    {submitError && <ul className="list-disc mx-[40px] mt-[8px]"><li className="text-red-500 text-[12px] font-bold">{submitError}</li></ul>}

                    {/* add button */}
                    <div className="flex justify-center items-center my-[20px]">
                        <button
                            onClick={handleSubmit}
                            className="bg-[#81C784] w-[100px] h-[30px] border-2 border-[#86DD89] rounded-[5px] text-[16px] text-white md:h-[40px] md:text-[20px]"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}