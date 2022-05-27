import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { paths } from "../../../routes/routes.config";
import { authenticationService } from "../../../utils/auth.service";
import { showErrorToast } from "../../../utils/toastUtil";
import "./signup.scss";
const Signup = () => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { handleSubmit, register } = useForm();
  const [data, setData] = useState({
    emailError: false,
    passwordError: false,
    showPassword: false,
  });
  const onClickShowPassword = () => {
    setData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };
  const doLogin = (formData: any) => {
    console.log(formData);
    setButtonDisabled(true);
    const emailVerify = authenticationService.emailVerification(formData.email);
    const passwordVerify = authenticationService.passwordVerification(
      formData.password
    );
    if (!emailVerify) {
      setData((prev) => ({ ...prev, emailError: true }));
      setButtonDisabled(false);
      showErrorToast("give valid email");
    } else if (!passwordVerify) {
      setData((prev) => ({ ...prev, passwordError: true }));
      showErrorToast(`${passwordVerify}`);
      setButtonDisabled(false);
    } else {
      setData((prev) => ({ ...prev, emailError: true }));
      setData((prev) => ({ ...prev, passwordError: true }));
      authenticationService
        .registerUser(formData)
        .then((response: any) => {
          setButtonDisabled(false);
        })
        .catch((error) => {
          setButtonDisabled(false);
        });
    }
  };
  return (
    <div className="main-container">
      <form className="boxShadow" onSubmit={handleSubmit(doLogin)}>
        <h3>Signup up to Social Feed</h3>
        <div className="names">
          <TextField
            id="firstName"
            label="first name"
            variant="outlined"
            sx={{ width: "50%", mr: 1 }}
            {...register("firstName")}
          />
          <TextField
            id="lastName"
            sx={{ width: "50%", ml: 1 }}
            label="last name"
            variant="outlined"
            {...register("lastName")}
          />
        </div>
        <TextField
          id="email"
          label="email id"
          sx={{ width: "80%" }}
          variant="outlined"
          {...register("email")}
        />
        <FormControl sx={{ width: "80%" }} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={data.showPassword ? "text" : "password"}
            {...register("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={onClickShowPassword}
                  edge="end"
                >
                  {data.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ width: "80%" }}
          loading={isButtonDisabled}
        >
          Sign In
        </LoadingButton>
        <p className="signIn">
          Already have an account?
          <Link to={paths.login}>Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
