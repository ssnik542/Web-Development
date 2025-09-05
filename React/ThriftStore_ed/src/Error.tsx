import { useRouteError } from "react-router-dom";
export default function Error() {
  const routeError = useRouteError();
  console.log(routeError);
  return <div>Error</div>;
}
