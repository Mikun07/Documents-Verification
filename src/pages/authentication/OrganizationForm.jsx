import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config/api";
import DropdownIcon from "../../assets/icons/DropdownIcon";
import SearchIcon from "../../assets/icons/SearchIcon";
import EyeLockIcon from "../../assets/icons/EyeLockIcon";
import EyeOpenIcon from "../../assets/icons/EyeOpenIcon";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function OrganizationForm() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openConfirmPassword, setOpenConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");

  const togglePassword = () => {
    setOpenPassword((prev) => !prev);
  };

  const toggleConfirmPassword = () => {
    setOpenConfirmPassword((prev) => !prev);
  };

  useEffect(() => {
    axios
      .post(`${BASE_URL}/countries_get_all`)
      .then((response) => {
        const data = response.data?.data;
        setCountryData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  async function signUp() {
    try {
      let signupResult = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          email,
          category: "org",
          password,
          phone,
          confirmPassword,
          companyName,
          country: selected,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (signupResult.status == "200") {
        navigate("/login");
        toast.success("User as been created");
      } else {
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className="flex flex-col mt-1 w-full gap-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signUp();
          }}
          className="flex w-full flex-col gap-8"
        >
          <div className="flex items-center gap-11">
            <input
              type="text"
              placeholder="Firstname"
              onChange={(e) => setFirstName(e.target.value)}
              // value={firstName}
              className="flex w-full outline-none border-b-4 border-[#40B52D] bg-transparent items-center px-4 text-black h-10"
            />
          </div>

          <div className="flex items-center gap-11">
            <input
              type="text"
              placeholder="Lastname"
              onChange={(e) => setLastName(e.target.value)}
              className="flex w-full outline-none border-b-4 border-[#40B52D] bg-transparent items-center px-4 text-black h-10"
            />
          </div>

          <div className="flex items-center gap-11">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="flex w-full outline-none border-b-4 border-[#40B52D] bg-transparent items-center px-4 text-black h-10"
            />
          </div>

          <div className="flex items-center gap-11">
            <input
              type="text"
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
              className="flex w-full outline-none border-b-4 border-[#40B52D] bg-transparent items-center px-4 text-black h-10"
            />
          </div>

          <div className="relative flex items-center gap-3">
            <input
              type={openPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="flex w-full outline-none border-b-4 border-[#40B52D] bg-transparent items-center px-4 text-black h-10"
            />
            <div className="absolute top-1 right-4">
              {openPassword === false ? (
                <span onClick={togglePassword}>
                  <EyeOpenIcon />
                </span>
              ) : (
                <span onClick={togglePassword}>
                  <EyeLockIcon />
                </span>
              )}
            </div>
          </div>

          <div className="relative flex items-center gap-3">
            <input
              type={openConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex w-full outline-none border-b-4 border-[#40B52D] bg-transparent items-center px-4 text-black h-10"
            />
            <div className="absolute top-1 right-4">
              {openConfirmPassword === false ? (
                <span onClick={toggleConfirmPassword}>
                  <EyeOpenIcon />
                </span>
              ) : (
                <span onClick={toggleConfirmPassword}>
                  <EyeLockIcon />
                </span>
              )}
            </div>
          </div>

          <div className=" relative flex flex-col justify-between items-center gap-3">
            <div
              onClick={() => setOpen(!open)}
              className={`flex relative justify-between w-full outline-none border-b-4 border-[#40B52D] bg-transparent items-center px-4 text-black h-10 ${
                !selected && "text-black"
              }`}
            >
              {selected
                ? selected.length > 30
                  ? selected.substring(0, 30) + "..."
                  : selected
                : "Select Country"}
              <div className=" text-[#40B52D]">
                <DropdownIcon />
              </div>
            </div>

            {open && (
              <div
                className={`absolute top-[70px] border-2 max-h-48 overflow-y-auto mx-3 w-full custom__scrollbar rounded-lg bg-white`}
              >
                <div className="flex items-center sticky top-0 bg-white gap-4 py-2 pl-3">
                  <SearchIcon />
                  <input
                    onChange={(e) => {
                      setInputValue(e.target.value.toLowerCase());
                    }}
                    type="text"
                    placeholder="Enter country name"
                    className="outline-none text-black p-2 pr-8  w-full"
                  />
                </div>
                {countryData.map(({ name, id }) => (
                  <div
                    key={id}
                    value={inputValue}
                    onClick={() => {
                      if (name.toLowerCase() !== selected.toLowerCase()) {
                        setSelected(name);
                        setOpen(false);
                      }
                    }}
                    className={`cursor-pointer flex font-semibold capitalize flex-col pl-2 py-2 w-full text-black hover:bg-gray-200
                        ${
                          name.toLowerCase() === selected.toLowerCase() &&
                          "bg-[#40B52D] text-white hover:bg-[#40B52D] hover:text-white"
                        }
                        ${
                          name.toLowerCase().startsWith(inputValue)
                            ? "block"
                            : "hidden"
                        }`}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-11">
            <input
              type="text"
              placeholder="Company Name"
              onChange={(e) => setCompanyName(e.target.value)}
              className="flex w-full outline-none border-b-4 border-[#40B52D] bg-transparent items-center px-4 text-black h-10"
            />
          </div>
        </form>

        <div className="flex justify-center">
          <button
            onClick={signUp}
            type="submit"
            className="flex capitalize text-base text-[#40B52D] font-semibold items-center justify-center rounded-xl px-10 py-2 border-2 border-[#40B52D] bg-transparent hover:text-white hover:bg-[#D4973B] hover:bg-opacity-85 hover:border-[#D4973B] hover:border-opacity-85"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default OrganizationForm;
