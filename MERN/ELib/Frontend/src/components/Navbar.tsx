import { NavLink, useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import { LogOut } from "lucide-react";
import useTokenStore from "../store";
function Navbar() {
  // @ts-expect-error noError
  const { token, setToken } = useTokenStore((state) => state);
  const navigate = useNavigate();
  const logout = () => {
    setToken("");
    navigate("/signIn");
  };
  return (
    <nav className="flex justify-between mx-auto p-2 border-b-2 border-black items-center">
      <NavLink to={"/"}>
        <div className="flex gap-2 items-center">
          <img
            src="https://i.etsystatic.com/41975932/r/il/909d0a/5058273897/il_fullxfull.5058273897_fqai.jpg"
            alt="Notesylogo"
            className="w-8 h-8 rounded-lg"
          />
          <h1 className="font-bold tracking-wide text-lg">Notesy</h1>
        </div>
      </NavLink>
      {token ? (
        <div className="flex gap-5">
          <NavLink to={"/user/dashboard"}>
            <CircleUserRound className="cursor-pointer" />
          </NavLink>
          <LogOut className="cursor-pointer" onClick={logout} />
        </div>
      ) : (
        <div className="flex gap-2">
          <NavLink
            to="/signIn"
            className="border-2 px-4 py-1 border-blue-400 rounded-md hover:border-blue-300 transition-all active:scale-90 font-semibold tracking-wide"
          >
            SignIn
          </NavLink>
          <NavLink
            to="/signUp"
            className="border-2 px-4 py-1 border-blue-400 rounded-md hover:border-blue-300 transition-all active:scale-90 font-semibold tracking-wide"
          >
            SignUp
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
