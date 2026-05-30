export default function Diary(){
    return(
        <div>
            {/* diary */}
            <div className="bg-[#ADC7B1] border-1 border-[#575E56] w-[358px] rounded-[10px]">
                <div className="text-[20px] text-white font-bold mx-[20px] mt-[20px]">
                    Title
                </div>

                <div className="text-[12px] mx-[20px]">
                    Story
                </div>

                <div className="flex flex-row justify-between items-center text-[12px] mx-[20px] mb-[20px]">
                    Date

                    {/* button delete/edit */}
                    <div className="flex flex-row gap-[20px]">
                        <img src="public/bin.svg" alt="bin" className="w-[15px] h-[15px]"/>

                        <img src="public/edit.svg" alt="pencil"className="w-[15px] h-[15px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}