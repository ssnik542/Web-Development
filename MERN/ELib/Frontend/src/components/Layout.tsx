import Navbar from "./Navbar";

type Layoutprops = {
  children: JSX.Element;
};
function Layout({ children }: Layoutprops) {
  return (
    <div className="container mx-auto">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
