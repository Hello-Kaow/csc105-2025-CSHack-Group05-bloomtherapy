import Navbar from "../components/Navbar";
import Diary from "../components/Diary";

export default function Journal(){
    return(
        <div className=" min-h-screen">
            <Navbar/>

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
                </div>
            </div>
        </div>
    );
}