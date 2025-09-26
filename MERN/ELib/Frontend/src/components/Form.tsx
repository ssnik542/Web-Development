import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useTokenStore from "../store";
function Form({ isSignInPage = false }: { isSignInPage: boolean }) {
  const navigate = useNavigate();
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // @ts-expect-error noErr
  const setToken = useTokenStore((state) => state.setToken);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setFormData((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const URL = isSignInPage
      ? "http://localhost:8800/api/users/login"
      : "http://localhost:8800/api/users/register";
    try {
      setLoading(true);
      const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        const data = await response.json();
        setToken(data.accessToken);
        // localStorage.setItem("Authorization", data.accessToken);
        navigate("/");
        console.log(data);
      } else {
        const data = await response.json();
        setErr(data.message);
      }
      setLoading(false);
    } catch (error) {
      setErr("Something went wrong");
    }
  };

  return (
    <div className="mt-10 max-w-sm mx-auto">
      <form
        onSubmit={(e) => onSubmit(e)}
        className="flex flex-col gap-4 justify-center border-t-2 border-t-[#333] px-4 py-8 rounded-md shadow-lg shadow-blue-700/50 shadow-b-2 shadow-r-[3px] -shadow-spread-4"
      >
        <NavLink to={"/"} className={"self-center"}>
          <div className="flex gap-2 items-center">
            <img
              src="https://i.etsystatic.com/41975932/r/il/909d0a/5058273897/il_fullxfull.5058273897_fqai.jpg"
              alt="Notesylogo"
              className="w-8 h-8 rounded-lg"
            />
            <h1 className="font-bold tracking-wide text-lg">Notesy</h1>
          </div>
        </NavLink>
        {!isSignInPage && (
          <input
            onChange={onChange}
            className="border-2 border-black/50 p-1 rounded-md text-black placeholder:text-black/90"
            placeholder="Name"
            required
            id="name"
            type="text"
            value={formdata.name}
          />
        )}
        <input
          onChange={onChange}
          className="border-2 border-black/50 p-1 rounded-md text-black placeholder:text-black/90"
          placeholder="Email"
          type="email"
          required
          id="email"
          value={formdata.email}
        />
        <input
          onChange={onChange}
          className="border-2 border-black/50 p-1 rounded-md text-black placeholder:text-black/90"
          placeholder="Password"
          required
          id="password"
          type="password"
          value={formdata.password}
        />
        <span className="text-sm text-red-500 font-semibold ml-2">{err}</span>
        <input
          disabled={loading}
          type="submit"
          className="border-2 py-1 cursor-pointer px-3 border-blue-400 rounded-md hover:border-blue-300 transition-all active:scale-90 font-semibold tracking-wide self-center"
          value={!loading ? (isSignInPage ? "SignIn" : "SignUp") : "Loading..."}
        />
      </form>
      <p className="flex justify-center mt-4">
        {isSignInPage ? "Don't have account ?" : "Already have account ?"}{" "}
        <NavLink
          to={!isSignInPage ? "/signIn" : "/signUp"}
          className={"ml-1 text-blue-800 underline"}
        >
          {!isSignInPage ? "SignIn" : "SignUp"}
        </NavLink>
      </p>
    </div>
  );
}

export default Form;
