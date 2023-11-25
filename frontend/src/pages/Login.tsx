import { TextField, ThemeProvider, Checkbox, Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import coverImage from "../assets/login-cover.png";

const theme = {
    palette: {
        primary: {
            main: "#ffff",
        },
    },
};

const themes = createTheme(theme);
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Login = () => {
    return (
        <div className=" h-screen bg-slate-300 flex justify-between">
            <img className="w-[55%] h-[100vh]" src={coverImage} alt="login" />

            <div className="w-[45%] bg-gray-900 flex flex-col justify-around">
                <div className="flex flex-col text-center text-white">
                    <div className=" text-4xl ">Welcome Back !</div>
                    <div className="mt-6">Please enter your details</div>
                </div>

                <ThemeProvider theme={themes}>
                    <div className="flex flex-col mx-[120px]">
                        <TextField
                            // InputProps={{ inputLabelProps: { style: { color: "white" } } }}
                            id="standard-basic"
                            label="Email"
                            variant="standard"
                        />
                        <TextField id="standard-basic" label="Password" variant="standard" />
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center ">
                                <Checkbox {...label} defaultChecked />
                                <div className="text-white">Remember for 30 days</div>
                            </div>
                            <div className="forgot-pswd text-white items-center ">
                                Forgot Password?
                            </div>
                        </div>
                        <Button sx={{ margin: " 30px 100px" }} variant="contained">
                            Log In
                        </Button>
                    </div>
                </ThemeProvider>

                <div className="text-white text-center">Don't have an account? SIGN UP</div>
            </div>
        </div>
    );
};

export default Login;
