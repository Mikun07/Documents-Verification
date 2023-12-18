import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import OrganizationForm from "./OrganizationForm";
import IndividualForm from "./IndividualForm";

function RegisterPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("individual");

  const registerTabs = {
    organization: <OrganizationForm />,
    individual: <IndividualForm />,
  };

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

        <div className="lg:bg-white bg-transparent z-50 lg:w-[400px] lg:shadow-md w-full h-[500px] rounded-xl">
          <div className="flex h-12 w-full justify-between">
            <button
              onClick={() => setActiveTab("individual")}
              className={
                activeTab == "individual"
                  ? " border-[#40B52D] flex items-center justify-center shadow-xl border-b-4 w-full p-3"
                  : "w-full flex items-center justify-center p-3"
              }
            >
              Individual
            </button>
            <button
              onClick={() => setActiveTab("organization")}
              className={
                activeTab == "organization"
                  ? " border-[#40B52D] flex items-center justify-center shadow-xl border-b-4 w-full p-3"
                  : "w-full flex items-center justify-center p-3"
              }
            >
              Organization
            </button>
          </div>
          <div className="flex flex-col justify-center items-center w-full px-10">
            <h1 className="capitalize text-4xl mt-8 text-[#40B52D] font-bold">
              Sign Up
            </h1>

            <div className="w-full max-h-64 mt-3 custom__scrollbar px-3 overflow-y-auto">
              {registerTabs[activeTab]}
            </div>
            <h2 className="text-xl font-semibold capitalize mt-6">
              I already have an account{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-[#40B52D] cursor-pointer hover:text-[#D4973B] hover:text-opacity-85"
              >
                Login
              </span>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
