import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config/api";
import toast from "react-hot-toast";
import axios from "axios";
import Logo from "../../assets/Logo.png";
import EyeLockIcon from "../../assets/icons/EyeLockIcon";
import EyeOpenIcon from "../../assets/icons/EyeOpenIcon";

function LoginPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const redirectUrl = {
    org: "/admin/dashboard",
    admin: "/admin/dashboard",
    // indv: "",
  };
  async function login() {
    try {
      let result = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const { token, message, user } = result?.data;
      if (token) {
        localStorage.setItem("authToken", JSON.stringify(token));
        if (user?.category) {
          navigate(redirectUrl[user?.category]);
          toast.success(message);
        } else {
          navigate("/admin/dashboard");
        }
      } else {
        toast.alert(message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="bg-gray-300 relative flex justify-center items-center overflow-hidden w-full h-screen">
        <div className="top-0 right-0 left-0 bottom-0 z-10">
          <span className="rotate-45 absolute z-30 h-[520px] w-[520px] bg-white top-[-195px] lg:left-[-260px] left-[-400px] rounded-t-[22px]"></span>
          <span className="rotate-45 absolute z-20 h-[420px] w-[420px] bg-[#D4973B] top-[-390px] lg:right-[50px] left-[120px] rounded-[52px]"></span>
          <span className="rotate-45 absolute z-20 h-[520px] w-[172px] bg-[#FFFFFF] rounded-[52px] lg:top-[-16px] top-[106px] right-[-20px]"></span>
          <span className="rotate-45 absolute z-20 h-[400px] w-[200px] bg-gradient-to-r from-[#D4973B] to-[#936013] rounded-[52px] lg:top-[420px] lg:right-[30px] top-[620px] right-[10px]"></span>
        </div>

        <div className="text-xl z-40 absolute lg:top-5 lg:left-5 top-10 left-2 flex gap-2 items-center justify-center">
          <div className="lg:w-[90px] w-[60px]">
            <img src={Logo} alt="" />
          </div>
          <b className="flex flex-col gap-0 capitalize lg:text-base text-lg text-[#40B52D]">
            Documents <span className="text-[#D4973B]">Verification</span>
          </b>
        </div>

        <div className="lg:bg-white z-20 bg-transparent flex justify-center lg:w-[400px] lg:shadow-md w-full h-[500px] rounded-xl">
          <div className="flex flex-col w-full items-center">
            <h1 className="capitalize text-[#40B52D] mt-10 font-bold">Login</h1>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                login();
              }}
              className="flex flex-col px-8 gap-8 mt-5 w-full"
            >
              <div className="flex justify-between items-center gap-11">
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex w-full outline-none border-b-4 border-[#40B52D] bg-transparent items-center px-4 text-black h-14"
                />
              </div>
              <div className="relative flex items-center gap-3">
                <input
                  type={open ? "text" : "password"}
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex w-full outline-none border-b-4 border-[#40B52D] bg-transparent items-center px-4 text-black h-14"
                />

                <div className="absolute top-3 right-4">
                  {open === false ? (
                    <span onClick={toggle}>
                      <EyeOpenIcon />
                    </span>
                  ) : (
                    <span onClick={toggle}>
                      <EyeLockIcon />
                    </span>
                  )}
                </div>
              </div>
              <a className="text-[#40B52D] hover:text-[#D4973B] flex font-medium pl-6 cursor-pointer">
                Forgot password
              </a>
            </form>

            <button
              onClick={login}
              type="submit"
              className="flex capitalize text-base mt-8 text-[#40B52D] font-semibold items-center justify-center rounded-xl px-10 py-2 border-2 border-[#40B52D] bg-transparent hover:text-white hover:bg-[#D4973B] hover:bg-opacity-85 hover:border-[#D4973B] hover:border-opacity-85"
            >
              login
            </button>

            <div className="mt-8">
              <h2 className=" font-semibold capitalize">
                don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-[#40B52D] cursor-pointer hover:text-[#D4973B] hover:text-opacity-85"
                >
                  Sign up
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
