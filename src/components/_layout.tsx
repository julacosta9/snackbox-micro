import Nav from "../components/Nav";
import SideNav from "../components/SideNav";
import Footer from "../components/Footer";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="border border-solid border-red-500">
        <Nav />
        <SideNav />
        <Main>
          {children}
          <Footer />
        </Main>
      </div>
    </>
  );
};

const Main = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grow">
        <div className="lg:pl-[11.5rem]">
          {/* <main className="max-w-3xl mx-auto pt-10 xl:max-w-none xl:ml-0 xl:mr-[10rem] xl:pr-16"> */}
          <main className="max-w-[800px] mx-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
