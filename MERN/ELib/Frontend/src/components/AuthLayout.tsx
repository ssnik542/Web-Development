import { useNavigate } from "react-router-dom";
import useTokenStore from "../store";
import { useEffect } from "react";

type Layoutprops = {
  children: JSX.Element;
};
function AuthLayout({ children }: Layoutprops) {
  const navigate = useNavigate();
  const user = useTokenStore((state) => state.token);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  if (user) return;
  return <div>{children}</div>;
}

export default AuthLayout;
