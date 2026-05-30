import { useNavigate } from "react-router-dom";

type LoginRequiredPopupProps = {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
    loginPath?: string;
};

export default function LoginRequiredPopup({
    isOpen,
    onClose,
    message = "Please login first to use the website.",
    loginPath = "/login",
}: LoginRequiredPopupProps) {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const goToLogin = () => {
        onClose();
        navigate(loginPath);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f2d24]/40 backdrop-blur-sm px-4">
            <div className="relative w-full max-w-md rounded-2xl bg-[#f3f8ed] border border-[#dce8d6] shadow-2xl p-8 text-center">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#7fa17d] hover:text-[#5f7f5d] text-xl font-bold"
                >
                    ×
                </button>

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#a8c4af]/40 text-3xl">
                    🌱
                </div>

                <h2 className="text-2xl font-bold text-[#7fa17d]">
                    Login required
                </h2>

                <p className="mt-3 text-[#7f8f9f] leading-relaxed">
                    {message.includes("login") ? (
                        <>
                            Please{" "}
                            <button
                                onClick={goToLogin}
                                className="font-bold text-[#4169E1] underline underline-offset-4 hover:text-[#e86d4d]"
                            >
                                login
                            </button>{" "}
                            first to use the website.
                        </>
                    ) : (
                        message
                    )}
                </p>

                <div className="mt-6 flex justify-center gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-md border border-[#a8c4af] px-5 py-2 font-semibold text-[#7fa17d] hover:bg-white transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={goToLogin}
                        className="rounded-md bg-[#8daa96] px-6 py-2 font-bold text-white shadow hover:bg-[#7f9f87] transition"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}