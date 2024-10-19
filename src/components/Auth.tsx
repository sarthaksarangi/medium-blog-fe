import { useState } from "react";
import { LabelledInputInterface } from "../Utils";
import { SignupInput } from "@sarthak.dev/medium-common";
import { Link } from "react-router-dom";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  return (
    <div className="flex justify-center h-screen flex-col">
      <div className="flex justify-center">
        <div>
          <div className="text-center px-10">
            {type === "signin" ? (
              <div className="text-4xl font-extrabold">Create an Account</div>
            ) : (
              <div className="text-4xl font-extrabold">
                Login to your Account
              </div>
            )}
            <div className=" text-lg text-slate-500 mt-2">
              {type === "signin"
                ? "Already have an account?"
                : "Don't have an account?"}
              {type === "signin" ? (
                <Link className="underline" to={"/signin"}>
                  Login
                </Link>
              ) : (
                <Link className="underline" to={"/signup"}>
                  {" "}
                  Signup
                </Link>
              )}
            </div>
          </div>
          <div>
            {type === "signin" ? (
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
              label="Name"
              type="password"
              placeholder="8 digit Password"
              onChange={(e) =>
                setPostInputs({ ...postInputs, password: e.target.value })
              }
            />
            <button
              type="submit"
              className="text-white w-full bg-slate-800 hover:bg-slate-900 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-3 text-center mt-6 "
            >
              {type === "signup" ? "Signup" : "Signin"}
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
      <label className="block mb-2 text-sm font-medium text-gray-900 mt-4">
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
