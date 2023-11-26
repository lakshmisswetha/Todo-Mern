import { TextField, ThemeProvider, Checkbox, Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import coverImage from "../assets/login-img.jpg";

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
                        <TextField id="standard-basic" label="Password" variant="standard" />
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center ">
                                <Checkbox {...label} defaultChecked />
                                <div className="text-black">Remember for 30 days</div>
                            </div>
                            <div className="forgot-pswd text-black items-center ">
                                Forgot Password?
                            </div>
                        </div>
                        <Button sx={{ margin: " 30px 100px" }} variant="contained">
                            Sign IN
                        </Button>
                    </form>
                </ThemeProvider>

                <div className="text-blue-900 font-semibold text-center">
                    Don't have an account? SIGN UP
                </div>
            </div>
        </div>
    );
};

export default Login;
