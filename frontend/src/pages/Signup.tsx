import { TextField, ThemeProvider, Checkbox, Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import coverImage from "../assets/login-img.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/config";
import { Formik, useFormik } from "formik";
import { z } from "zod";
import { toFormikValidate } from "zod-formik-adapter";

const themes = createTheme({
    palette: {
        primary: {
            main: "#000000",
        },
        mode: "light",
    },
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const signupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6, "minimum six characters required"),
});

const Signup = () => {
    const navigate = useNavigate();
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

    const onSubmit = () => {
        submit(values.username, values.email, values.password);
    };

    const submit = async (username: string, email: string, password: string) => {
        try {
            const response = await fetch(`${BASE_URL}/user/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            if (data.status) {
                navigate("/");
            } else {
                console.log(data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validateOnChange: false,
        validateOnBlur: false,
        validate: toFormikValidate(signupSchema),
        onSubmit,
    });

    return (
        <div className="  h-screen  bg-white-50 justify-center flex md:justify-between">
            <div className="hidden justify-center items-center pl-28 md:flex">
                <img className="w-[400px] h-[400px]" src={coverImage} alt="login" />
            </div>

            <div className="w-full rounded-3xl bg-gradient-to-br from-gray-200 from-50% to-indigo-200 flex flex-col justify-around my-7 mx-5 md:w-[50%]">
                <div className="flex flex-col text-center">
                    <div className=" text-4xl font-bold">Welcome !!</div>
                    <div className="mt-6 font-semibold">Register your account</div>
                </div>

                <ThemeProvider theme={themes}>
                    <div className="flex flex-coln justify-center w-full">
                        <form
                            onSubmit={handleSubmit}
                            className="w-full mx-2 max-w-[380px] flex flex-col items-center"
                        >
                            <TextField
                                id="username"
                                label="Username"
                                variant="standard"
                                style={{ marginBottom: "10px" }}
                                fullWidth
                                value={values.username}
                                onChange={handleChange}
                                error={Boolean(errors.username)}
                                helperText={errors.username}
                            />
                            <TextField
                                id="email"
                                label="Email"
                                variant="standard"
                                fullWidth
                                value={values.email}
                                onChange={handleChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                            />
                            <div className="flex w-full">
                                <TextField
                                    id="password"
                                    label="Password"
                                    variant="standard"
                                    type={type}
                                    fullWidth
                                    value={values.password}
                                    onChange={handleChange}
                                    error={Boolean(errors.password)}
                                    helperText={errors.password}
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
                                    <div className="text-black">
                                        I agree with terms and privacy policy
                                    </div>
                                </div>
                                {/* <div className="forgot-pswd text-white items-center ">
                                Forgot Password?
                            </div> */}
                            </div>
                            <Button
                                type="submit"
                                sx={{ margin: " 30px 100px" }}
                                variant="contained"
                            >
                                Create Account
                            </Button>
                        </form>
                    </div>
                </ThemeProvider>

                <div className="text-blue-900 font-semibold text-center">
                    <Link to={"/"}>Already have an account? SIGN IN</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
