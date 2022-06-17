import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./reset-password.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { GoogleLogin } from "react-google-login";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { authenticationService } from "../../../utils/auth.service";
import { showErrorToast } from "../../../utils/toastUtil";
import { paths } from "../../../routes/routes.config";
import { Link, useLocation } from "react-router-dom";
import { userDataChange } from "../../../redux/reducers";
import { useDispatch } from "react-redux";
import history from "../../../routes/history";

export default function Login() {
  // Initial hooks
  const location = useLocation();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { handleSubmit, register } = useForm();
  const [data, setData] = useState({
    showNewPassword: false,
    showConformPassword: false,
  });
  useEffect(() => {
    let query = location.search;
    const token = new URLSearchParams(query).get("token");
    if (!token) {
      history.push("/auth/login");
    }
  }, []);

  const onClickShowNewPassword = () => {
    setData((prev) => ({ ...prev, showNewPassword: !prev.showNewPassword }));
  };
  const onClickShowConformPassword = () => {
    setData((prev) => ({
      ...prev,
      showConformPassword: !prev.showConformPassword,
    }));
  };

  /*
   * Verify Credentials
   */
  const clickForgotPassword = async (formData: any) => {
    let query = location.search;
    const token = new URLSearchParams(query).get("token");
    console.log(token);
    console.log(formData.conformPassword, formData.newPassword);
    setButtonDisabled(true);
    if (formData.conformPassword === formData.newPassword) {
      const passwordVerification = authenticationService.passwordVerification(
        formData.conformPassword
      );
      if (passwordVerification) {
        await authenticationService.resetTheNewPassword(
          {
            password: formData.conformPassword,
          },
          token || ""
        );
      } else {
        showErrorToast("Invalid Password");
      }
      setButtonDisabled(false);
    } else {
      showErrorToast("new password and conform password unmatched");
      setButtonDisabled(false);
    }
    setButtonDisabled(false);
  };
  /*
   * Render
   */
  return (
    <div className="main-container-forgot">
      <form onSubmit={handleSubmit(clickForgotPassword)}>
        <Box className="boxShadow">
          <h2>Set your new password</h2>
          <FormControl sx={{ width: "80%" }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="newPassword"
              type={data.showNewPassword ? "text" : "password"}
              // onChange={onChangePassword}
              {...register("newPassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onClickShowNewPassword}
                    edge="end"
                  >
                    {data.showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl sx={{ width: "80%" }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="conformPassword"
              type={data.showConformPassword ? "text" : "password"}
              // onChange={onChangePassword}
              {...register("conformPassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={onClickShowConformPassword}
                    edge="end"
                  >
                    {data.showConformPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ width: "30%" }}
            loading={isButtonDisabled}
          >
            Reset Password
          </LoadingButton>
          <Button>
            <Link to={paths.login} className="backButton">
              Back
            </Link>
          </Button>
        </Box>
      </form>
    </div>
  );
}
