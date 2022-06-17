import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./forgot-password.scss";
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
import { Link } from "react-router-dom";
import { userDataChange } from "../../../redux/reducers";
import { useDispatch } from "react-redux";

export default function Login() {
  // Initial hooks
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { handleSubmit, register } = useForm();
  const [data, setData] = useState({
    showPassword: false,
  });

  /*
   * Verify Credentials
   */
  const clickForgotPassword = async (formData: any) => {
    console.log(formData);
    const emailVerify = authenticationService.emailVerification(formData.email);
    setButtonDisabled(true);
    if (emailVerify) {
      await authenticationService.sendLinkForForgotPassword(formData);
      setButtonDisabled(false);
    } else {
      showErrorToast("give valid email");
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
          <h2>Forgot your password?</h2>
          <p className="paraForgot ">
            Please enter the email address associated with your account, and
            we'll email you a link to reset your password.
          </p>
          <TextField
            id="email"
            label="email"
            variant="outlined"
            sx={{ width: "80%", mr: 1 }}
            {...register("email")}
          />

          <LoadingButton
            type="submit"
            variant="contained"
            sx={{ width: "20%" }}
            loading={isButtonDisabled}
          >
            Send Link
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
