import Navbar from "../components/Navbar";

export default function EditDiary(){
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
                    <input type="text" className="bg-white w-[319px] h-[25px] rounded-[5px] border-1 mx-[20px] px-[10px] text-[16px] md:w-[400px] md:h-[40px]"/>

                    <div className="text-[16px] mx-[20px] mt-[20px] md:text-[20px]">
                        Diary
                    </div>
                    <textarea className="bg-white w-[319px] h-[100px] rounded-[5px] border-1 mx-[20px] px-[10px] text-[16px] md:w-[400px] md:h-[100px]"/>

                    <div className="text-[16px] mx-[20px] mt-[20px] md:text-[20px]">
                        Date
                    </div>
                    <input type="date" className="bg-white w-[319px] h-[25px] rounded-[5px] px-[10px] border-1 mx-[20px] text-[16px] md:w-[400px] md:h-[40px]"/>

                    {/* add button */}
                    <div className="flex justify-center items-center my-[20px]">
                        <button className="bg-[#81C784] w-[100px] h-[30px] border-2 border-[#86DD89] rounded-[5px] text-[16px] text-white md:h-[40px] md:text-[20px]">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}