import { TextField, ThemeProvider, Checkbox, Button } from "@mui/material";
import { useState } from "react";
import { createTheme } from "@mui/material/styles";
import coverImage from "../assets/login-img.jpg";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

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
    const [password, setPassword] = useState("");
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        if (type === "password") {
            setIcon(eye);
            setType("text");
        } else {
            setIcon(eyeOff);
            setType("password");
        }
    };

    return (
        <div className=" h-screen bg-white-50 flex justify-between">
            <div className="p-[100px]">
                <img className=" w-[100%] h-[100%]" src={coverImage} alt="login" />
            </div>

            <div className="w-[50%] rounded-3xl bg-gradient-to-br from-gray-200 from-40% to-indigo-200 flex flex-col justify-around my-7 mr-5">
                <div className="flex flex-col text-center text-black">
                    <div className=" text-4xl font-bold">Welcome Back!!</div>
                    <div className="mt-6 font-semibold">Register your account</div>
                </div>

                <ThemeProvider theme={themes}>
                    <form className="flex flex-col mx-[180px]">
                        <TextField
                            // InputProps={{ inputLabelProps: { style: { color: "white" } } }}
                            id="standard-basic"
                            label="Email"
                            variant="standard"
                            style={{ marginBottom: "10px" }}
                        />
                        <div className="flex ">
                            <TextField
                                id="standard-basic"
                                label="Password"
                                variant="standard"
                                type={type}
                                style={{ width: "500px" }}
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
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center ">
                                <Checkbox {...label} defaultChecked />
                                <div className="text-black">Remember for 30 days</div>
                            </div>
                            <div className="forgot-pswd text-black items-center cursor-pointer ">
                                Forgot Password?
                            </div>
                        </div>
                        <Button sx={{ margin: " 30px 100px" }} variant="contained">
                            Sign IN
                        </Button>
                    </form>
                </ThemeProvider>

                <div className="text-blue-900 font-semibold text-center cursor-pointer">
                    <Link to={"/signup"}>Don't have an account? SIGN UP</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
