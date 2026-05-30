import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

type LoginForm = {
    username: string;
    password: string;
};

export default function Login(){
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState("");

    const { register, watch } = useForm<LoginForm>({
        defaultValues: { username: "", password: "" },
    });

    const usernameValue = watch("username") ?? "";
    const passwordValue = watch("password") ?? "";

    const handleLogin = async () => {
        if (isLoading) return;

        if (!usernameValue.trim() || !passwordValue.trim()) {
            setFormError("Please fill in all fields");
            return;
        }

        setFormError("");
        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/auth/login", {
                username: usernameValue.trim(),
                password: passwordValue.trim(),
            });

            const { user, token } = response.data;
            login(token, user); 
            navigate("/");
        }  
        catch (error: any) {
            const msg = error?.response?.data?.message || "Username or password is incorrect";
            setFormError(msg);
        } 
        finally {
            setIsLoading(false);
        }
    };

    let loginError = null;
    if (formError) {
        loginError = (
            <ul className="list-disc list-inside">
                <li className="text-red-500 tracking-widest font-bold mx-[20px] mt-[5px] text-[10px] md:text-[14px] md:mx-[40px]">
                    {formError}
                </li>
            </ul>
        );
    }

    return(
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col border-1 w-[250px] rounded-[10px] shadow-[0_0_20px_rgba(0,0,0,0.15)] md:w-[400px]">

                <div className="font-bold text-[14px] tracking-wide text-black m-[20px] md:text-[18px] md:m-[40px]">
                    Log in
                </div>

                <div className="text-[10px] font-bold tracking-widest mx-[20px] md:text-[14px] md:mx-[40px]">
                    Username
                </div>
                <input type="text" {...register("username")} className="w-[210px] h-[30px] rounded-[5px] border-1 border-gray-300 mt-[5px] mx-[20px] px-[10px] text-[10px] md:text-[14px] md:mx-[40px] md:w-[320px] md:h-[35px]"/>

                <div className="text-[10px] font-bold tracking-widest mt-[20px] mx-[20px] md:text-[14px] md:mt-[40px] md:mx-[40px]">
                    Password
                </div>
                <input type="password" {...register("password")} className="w-[210px] h-[30px] rounded-[5px] border-1 border-gray-300 mt-[5px] mx-[20px] px-[10px] text-[10px] md:text-[14px] md:mx-[40px] md:w-[320px] md:h-[35px]"/>

                {loginError}

                <div className="flex flex-col justify-center items-center">

                        {/* Button */}
                        <button
                            type="button"
                            onClick={handleLogin}
                            disabled={isLoading}
                            className="flex justify-center items-center bg-[#A2D0AA] w-[80px] h-[30px] rounded-[100px] text-white text-[10px] font-bold tracking-widest m-[20px] md:text-[14px] md:w-[120px] md:h-[42px] md:m-[40px] disabled:opacity-70 disabled:cursor-not-allowed">
                        {isLoading ? (
                            <span className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            "Log in"
                        )}
                    </button>

                    <div className="text-[10px] font-bold text-[#b4b4b4] mb-[20px] md:text-[14px] md:mb-[40px]">
                        Don't Have an account?{" "}
                        <span 
                            onClick={() => navigate("/signup")}
                            className="text-[#38b6ff] underline cursor-pointer hover:text-blue-500 transition-colors">
                            Sign up
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}