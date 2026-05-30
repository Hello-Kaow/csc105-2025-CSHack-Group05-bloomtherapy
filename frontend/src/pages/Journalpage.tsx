export default function Journal(){
    return(
        <div>
            {/* project name */}
            <img src="public/projectname.svg" alt="" className="w-[300px]"/>

            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-start mt-[20px] gap-[20px]">
                    {/* view */}
                    <img src="public/photoview.svg" alt="view" className="w-[358px] rounded-[16px]"/>

                    {/* add button */}
                    <button className="flex flex-row justify-center items-center bg-[#81C784] w-[128px] h-[36px] text-[14px] text-white rounded-[8px] gap-2">
                        <img src="public/pencil.svg" alt="pencil" />
                        ADD DIARY
                    </button>

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
            </div>
        </div>
    );
}