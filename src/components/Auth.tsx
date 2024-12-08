import { useState } from "react";
import { LabelledInputInterface } from "../Utils";
import { SignupInput } from "@sarthak.dev/medium-common";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import.meta.env.Ba;

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const sendRequest = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL +
          `/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = await response.data.token;
      console.log(jwt);
      localStorage.setItem("jwtToken", jwt);
      navigate("/blogs");
    } catch (e) {
      alert("Error While Signin/Signup");
      console.log(e);
    }
  };
  return (
    <div className="flex justify-center h-screen flex-col">
      <div className="flex justify-center">
        <div>
          <div className="text-center lg:px-10">
            {type === "signup" ? (
              <div className="text-4xl font-extrabold">Create an Account</div>
            ) : (
              <div className="text-4xl font-extrabold">
                Login to your Account
              </div>
            )}
            <div className=" text-lg text-slate-500 mt-2">
              {type === "signup"
                ? "Already have an account? "
                : "Don't have an account? "}
              {type === "signup" ? (
                <Link className="underline" to={"/signin"}>
                  Log in
                </Link>
              ) : (
                <Link className="underline" to={"/signup"}>
                  {" "}
                  Sign up
                </Link>
              )}
            </div>
          </div>
          <div>
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Enter your full name"
                type="text"
                onChange={(e) =>
                  setPostInputs({ ...postInputs, name: e.target.value })
                }
              />
            ) : (
              <></>
            )}
            <LabelledInput
              label="Email"
              type="email"
              placeholder="email@example.com"
              onChange={(e) =>
                setPostInputs({ ...postInputs, email: e.target.value })
              }
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="8 digit Password"
              onChange={(e) =>
                setPostInputs({ ...postInputs, password: e.target.value })
              }
            />
            <button
              type="submit"
              onClick={sendRequest}
              className="text-white w-full bg-slate-800 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-3 text-center mt-6 "
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

const LabelledInput = ({
  label,
  placeholder,
  type,
  onChange,
}: LabelledInputInterface) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-900 mt-4">
        {label}
      </label>
      <input
        type={type}
        id={label}
        onChange={onChange}
        className="bg-slate-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-500 block w-full p-3 "
        placeholder={placeholder}
        required
      />
    </div>
  );
};
