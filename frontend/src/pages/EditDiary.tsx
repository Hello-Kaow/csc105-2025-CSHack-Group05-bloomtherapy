import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { journalApi, type Diary } from "../apis/journalApi";

export default function EditDiary(){
    const navigate = useNavigate();
    const location = useLocation();
    const diary = location.state as Diary;

    const [title, setTitle] = useState(diary?.title ?? "");
    const [story, setStory] = useState(diary?.story ?? "");
    const [date, setDate] = useState(diary?.date ? diary.date.slice(0, 10) : "");
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

    const handleSave = async () => {
        setSubmitError("");
        if (!validate()) return;

        try {
            await journalApi.updateDiary(diary.id, { title, story, date });
            navigate("/");
        } catch {
            setSubmitError("Failed to save diary. Please try again.");
        }
    };

    return(
        <div className="min-h-screen">
            <Navbar/>

            {/* project name */}
            <img src="public/projectname.svg" alt="" className="w-[300px] md:w-[400px] xl:hidden"/>

            {/* dummy height — space below top navbar on desktop */}
            <div className="h-[63.68px] hidden xl:block"></div>

            {/* Edit diary section */}
            <div className="flex flex-col justify-center items-center min-h-[calc(100vh-63.68px)] lg:ml-52 lg:w-[calc(100%-208px)]">
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

                    {/* save button */}
                    <div className="flex justify-center items-center my-[20px]">
                        <button
                            onClick={handleSave}
                            className="bg-[#81C784] w-[100px] h-[30px] border-2 border-[#86DD89] rounded-[5px] text-[16px] text-white md:h-[40px] md:text-[20px]"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}