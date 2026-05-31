import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { journalApi } from "../apis/journalApi";

export default function AddDiary(){
    const navigate = useNavigate();
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
            await journalApi.createDiary({ title, story, date });
            navigate("/");
        } catch {
            setSubmitError("Failed to add diary. Please try again.");
        }
    };

    return(
        <div className="relative min-h-screen overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <img src="/Wall 1.svg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40"/>
                <div className="absolute inset-0 bg-white/65"/>
            </div>

            <Navbar/>

            {/* project name */}
            <img src="public/projectname.svg" alt="" className="w-[300px] md:w-[400px] xl:hidden"/>

            {/* dummy height — space below top navbar on desktop */}
            <div className="h-[63.68px] hidden xl:block"></div>

            <div className="relative z-10 flex flex-col justify-center items-center min-h-[calc(100vh-63.68px)] lg:ml-52 lg:w-[calc(100%-208px)]">
                {/* Add diary section */}
                <div className="flex flex-col justify-center items-center">
                    <div className="bg-[#E0E0E0] w-[359px] rounded-[10px] md:w-[440px]">
                        <div className="text-[16px] mx-[20px] mt-[20px] md:text-[20px]">
                            Title
                        </div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-white w-[319px] h-[25px] rounded-[5px] border-1 mx-[20px] px-[10px] text-[16px] md:w-[400px] md:h-[40px]"/>
                        {errors.title && <ul className="list-disc mx-[40px] mt-[4px]"><li className="text-red-500 text-[12px] font-bold">{errors.title}</li></ul>}

                        <div className="text-[16px] mx-[20px] mt-[20px] md:text-[20px]">
                            Diary
                        </div>
                        <textarea
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                            className="bg-white w-[319px] h-[100px] rounded-[5px] border-1 mx-[20px] px-[10px] text-[16px] md:w-[400px] md:h-[100px] resize-none"/>
                        {errors.story && <ul className="list-disc mx-[40px] mt-[4px]"><li className="text-red-500 text-[12px] font-bold">{errors.story}</li></ul>}

                        <div className="text-[16px] mx-[20px] mt-[20px] md:text-[20px]">
                            Date
                        </div>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="bg-white w-[319px] h-[25px] rounded-[5px] px-[10px] border-1 mx-[20px] text-[16px] md:w-[400px] md:h-[40px]"/>
                        {errors.date && <ul className="list-disc mx-[40px] mt-[4px]"><li className="text-red-500 text-[12px] font-bold">{errors.date}</li></ul>}

                        {submitError && <ul className="list-disc mx-[40px] mt-[8px]"><li className="text-red-500 text-[12px] font-bold">{submitError}</li></ul>}

                        {/* add button */}
                        <div className="flex justify-center items-center my-[20px]">
                            <button
                                onClick={handleSubmit}
                                className="bg-[#81C784] w-[100px] h-[30px] border-2 border-[#86DD89] rounded-[5px] text-[16px] text-white md:h-[40px] md:text-[20px] hover:scale-105 transition-transform cursor-pointer">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}