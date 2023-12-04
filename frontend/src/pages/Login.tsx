import { TextField, ThemeProvider, Checkbox, Button } from "@mui/material";
import { useState } from "react";
import { createTheme } from "@mui/material/styles";
import coverImage from "../assets/login-img.jpg";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";

const theme = {
    palette: {
        primary: {
            main: "#000000",
        },
    },
};

const themes = createTheme(theme);
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);
    const [error, setError] = useState(false);

    const handleToggle = () => {
        if (type === "password") {
            setIcon(eye);
            setType("text");
        } else {
            setIcon(eyeOff);
            setType("password");
        }
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.status && data.accessToken && data.refreshToken) {
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                navigate("/todo");
                setError(false);
            } else {
                console.log(data);
                setError(true);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="  h-screen  bg-white-50 justify-center flex md:justify-between ">
            <div className="hidden justify-center items-center pl-28 md:flex">
                <img
                    className=" w-[300px] h-[300px] lg:w-[500px] h-[500px]"
                    src={coverImage}
                    alt="login"
                />
            </div>

            <div className="w-full rounded-3xl bg-gradient-to-br from-gray-200 from-40% to-indigo-200 flex flex-col justify-around my-7 mx-5 md:w-[50%] ">
                <div className="flex flex-col text-center text-black">
                    <div className=" text-4xl font-bold">Welcome Back!!</div>
                    <div className="mt-6 font-semibold">Register your account</div>
                </div>

                <ThemeProvider theme={themes}>
                    <div className="flex flex-coln justify-center w-full">
                        <form
                            onSubmit={handleLogin}
                            className="w-full mx-2 max-w-[380px] flex flex-col items-center"
                        >
                            <TextField
                                id="standard-basic"
                                label="Email"
                                variant="standard"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={error}
                            />
                            <div className="flex w-full ">
                                <TextField
                                    id="standard-basic"
                                    label="Password"
                                    variant="standard"
                                    type={type}
                                    fullWidth
                                    error={error}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span
                                    className="flex justify-around items-center"
                                    onClick={handleToggle}
                                >
                                    <Icon
                                        className="absolute mr-10 cursor-pointer"
                                        icon={icon}
                                        size={20}
                                    />
                                </span>
                            </div>
                            <div className=" flex  w-full justify-between items-center mt-2">
                                <div className="flex items-center justify-center ">
                                    <Checkbox {...label} defaultChecked />
                                    <div className="text-black text-sm">Remember for 30 days</div>
                                </div>
                                <div className="forgot-pswd text-sm text-black items-center cursor-pointer ml-2 ">
                                    Forgot Password?
                                </div>
                            </div>
                            <Button type="submit" className="w-[150px] mt-2" variant="contained">
                                Sign IN
                            </Button>
                        </form>
                    </div>
                </ThemeProvider>

                <div className="text-blue-900 font-semibold text-center cursor-pointer">
                    <Link to={"/signup"}>Don't have an account? SIGN UP</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
