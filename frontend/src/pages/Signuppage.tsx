import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type SignupForm = {
    username: string;
    password: string;
    confirmPassword: string;
};

export default function Signup(){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState("");

    const { register, watch } = useForm<SignupForm>({
        defaultValues: { username: "", password: "", confirmPassword: "" },
    });

    const usernameValue = watch("username") ?? "";
    const passwordValue = watch("password") ?? "";
    const confirmPasswordValue = watch("confirmPassword") ?? "";

    const handleSignup = async () => {
        if (isLoading) return;

        if (!usernameValue.trim() || !passwordValue.trim() || !confirmPasswordValue.trim()) {
            setFormError("Please fill in all fields");
                return;
        }

        if (passwordValue !== confirmPasswordValue) {
            setFormError("Passwords do not match");
            return;
        }

        const allRulesValid = rules.every((r) => r.valid);
        if (!allRulesValid) {
            setFormError("Password does not meet requirements");
            return;
        }

        setFormError("");
        setIsLoading(true);

        try {
            await axios.post("http://localhost:3000/auth/register", {
            username: usernameValue.trim(),
            password: passwordValue.trim(),
            });
            navigate("/login");
        } 
        catch (error: any) {
            const msg = error?.response?.data?.message || "Signup failed. Please try again.";
            setFormError(msg);
        } 
        finally {
            setIsLoading(false);
        }
    };


    const rules = [
        { label: "At least 8 characters ", valid: passwordValue.length >= 8 },
        { label: "One uppercase letter", valid: /[A-Z]/.test(passwordValue) },
        { label: "One number", valid: /[0-9]/.test(passwordValue) },
        { label: "One special character", valid: /[^a-zA-Z0-9]/.test(passwordValue) },
    ];

    const passwordsMatch =
        confirmPasswordValue.length > 0 && confirmPasswordValue === passwordValue;

    let confirmError = null;
    if (confirmPasswordValue.length > 0 && !passwordsMatch) {
        confirmError = (
            <ul className="list-disc list-inside">
                <li className="text-red-500 tracking-widest font-bold mx-[20px] mt-[5px] text-[10px] md:text-[14px] md:mx-[40px]">
                    Passwords do NOT match
                </li>
            </ul>
        );
    }

    return(
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col border-1 w-[250px] rounded-[10px] shadow-[0_0_20px_rgba(0,0,0,0.15)] md:w-[400px]">
                <div className="font-bold text-[14px] tracking-wide text-black m-[20px] md:text-[18px] md:m-[40px]">
                    Sign up
                </div>

                {/* Username */}
                <div className="text-[10px] font-bold tracking-widest mx-[20px] md:text-[14px] md:mx-[40px]">
                    Username
                </div>
                <input type="text" {...register("username")} className="w-[210px] h-[30px] rounded-[5px] border-1 border-gray-300 mt-[5px] mx-[20px] px-[10px] text-[10px] md:text-[14px] md:mx-[40px] md:w-[320px] md:h-[35px]"/>

                {/* Password */}
                <div className="text-[10px] font-bold tracking-widest mt-[20px] mx-[20px] md:text-[14px] md:mt-[40px] md:mx-[40px]">
                    Password
                </div>
                <input type="password" {...register("password")} className="w-[210px] h-[30px] rounded-[5px] border-1 border-gray-300 mt-[5px] mx-[20px] px-[10px] text-[10px] md:text-[14px] md:mx-[40px] md:w-[320px] md:h-[35px]"/>

                <ul className="list-disc list-inside mt-1">
                {rules.map((rule, index) => (
                    <li key={index} className={`tracking-widest  font-bold mx-[20px] mt-[5px] text-[8px] md:text-[12px] md:mx-[40px] ${rule.valid ? "text-green-500" : "text-red-500"}`}>
                        {rule.label}
                    </li>
                    ))}
                </ul>

                {/* Confirm password */}
                <div className="text-[10px] font-bold tracking-widest mt-[20px] mx-[20px] md:text-[14px] md:mt-[40px] md:mx-[40px]">
                    Confirm Password
                </div>
                <input type="password" {...register("confirmPassword")} className="w-[210px] h-[30px] rounded-[5px] border-1 border-gray-300 mt-[5px] mx-[20px] px-[10px] text-[10px] md:text-[14px] md:mx-[40px] md:w-[320px] md:h-[35px]"/>

                {confirmError}

                {formError ? (
                    <ul className="list-disc list-inside">
                        <li className="text-red-500 tracking-widest font-bold mx-[20px] mt-[5px] text-[10px] md:text-[14px] md:mx-[40px]">
                            {formError}
                        </li>
                    </ul>
                ) : null}

                <div className="flex flex-col justify-center items-center">

                        {/* Button */}
                        <button
                            type="button"
                            onClick={handleSignup}
                            disabled={isLoading}
                            className="flex justify-center items-center bg-gray-400 w-[80px] h-[30px] rounded-[100px] text-white text-[10px] font-bold tracking-widest m-[20px] md:text-[14px] md:w-[120px] md:h-[42px] md:m-[40px] disabled:opacity-70 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors">
                            {isLoading ? (
                            <span className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            "Sign up"
                        )}
                    </button>
                    <div className="text-[10px] font-bold text-[#b4b4b4] md:text-[14px] mb-[20px] md:mb-[40px]">
                            Already have an account?{" "}
                        <span 
                                onClick={() => navigate("/login")}
                                className="text-[#38b6ff] underline cursor-pointer hover:text-blue-500 transition-colors">
                            Log in
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}