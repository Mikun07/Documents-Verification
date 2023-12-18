import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EyeLockIcon from "../../assets/icons/EyeLockIcon";
import EyeOpenIcon from "../../assets/icons/EyeOpenIcon";

function IndividualForm() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggle = () => {
    setOpen(prev => !prev);
  };

  return (
    <>
      <div className="flex w-full flex-col mt-5 gap-6">
        <form
          action=""
          className="flex w-full flex-col gap-8 "
        >
          <div className="flex items-center gap-11">
            <input
              type="email"
              placeholder="Email"
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
        </form>

        <div className="flex justify-center">
          <button className="flex capitalize text-base text-[#40B52D] font-semibold items-center justify-center rounded-xl px-10 py-2 border-2 border-[#40B52D] bg-transparent hover:text-white hover:bg-[#D4973B] hover:bg-opacity-85 hover:border-[#D4973B] hover:border-opacity-85">
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default IndividualForm;
