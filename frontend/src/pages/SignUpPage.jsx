import React from "react";
import { GiMusicSpell } from "react-icons/gi";
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import { Link } from "@chakra-ui/react";

const SignUpPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <GiMusicSpell size={100} />
      </div>

      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
        <div className="font-bold mb-6 text-2xl">
          Sign up for free to start listening.
        </div>
        <TextInput
          label={"Email"}
          placeholder={"Enter your email address"}
          className="my-6"
        />
        <TextInput
          label={"Email ID or username"}
          placeholder={"Confirm your email address"}
          className="mb-6"
        />
        <PasswordInput label={"Password"} placeholder={"Password"} />
        <br />
        <TextInput
          label={"What should we call you?"}
          placeholder={"Enter profile name"}
          className="mb-6"
        />
        <div className="w-full flex items-center justify-center my-8 ">
          <button className="bg-blue-500 text-lg font-semibold p-3 px-8 rounded-full ">
            SIGN UP
          </button>
        </div>

        <div className="w-full border border-solid border-gray-300 "></div>
        <div className="my-6 font-bold text-lg">Already have an account ?</div>
        <div className="border border-gray-500 w-full flex items-center justify-center py-4 rounded-full hover:bg-indigo-400">
          <a href="/login">LOG IN INSTEAD</a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
