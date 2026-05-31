import { useNavigate } from "react-router-dom";
import type { Diary as DiaryType } from "../apis/journalApi";

type Props = {
    diary: DiaryType;
    onDelete: (id: string) => void;
};

export default function Diary({ diary, onDelete }: Props){
    const navigate = useNavigate();
    const formattedDate = new Date(diary.date).toLocaleDateString("en-GB", {
        year: "numeric", month: "long", day: "numeric",
    });

    return(
        <div>
            {/* diary */}
            <div className="bg-[#ADC7B1] border-1 border-[#575E56] w-[358px] rounded-[10px]">
                <div className="text-[20px] text-white font-bold mx-[20px] mt-[20px]">
                    {diary.title}
                </div>

                <div className="text-[12px] mx-[20px] font-semibold text-[#575E56] whitespace-pre-wrap break-words">
                    {diary.story}
                </div>

                <div className="flex flex-row justify-between font-semibold text-[#575E56] items-center text-[12px] mx-[20px] mb-[20px]">
                    {formattedDate}

                    {/* button delete/edit */}
                    <div className="flex flex-row gap-[20px]">
                        <img
                            src="public/bin.svg"
                            alt="bin"
                            className="w-[15px] h-[15px] cursor-pointer hover:scale-125 transition-transform"
                            onClick={() => onDelete(diary.id)}
                        />
                        <img
                            src="public/edit.svg"
                            alt="pencil"
                            className="w-[15px] h-[15px] cursor-pointer hover:scale-125 transition-transform"
                            onClick={() => navigate(`/editdiary/${diary.id}`, { state: diary })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}