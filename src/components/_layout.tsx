import { useState } from "react";
import Nav from "../components/Nav";
import SideNav from "../components/SideNav";
import SideNavMobile from "./SideNavMobile";
import CommandPalette from "./CommandPalette";
import Footer from "../components/Footer";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [showCommandPalette, setShowCommandPalette] = useState<boolean>(false);

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <CommandPalette
          isOpen={showCommandPalette}
          setIsOpen={setShowCommandPalette}
        />
        <Nav
          isCommandPaletteOpen={showCommandPalette}
          setShowCommandPalette={setShowCommandPalette}
        />
        <div className="flex max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <SideNav
            isCommandPaletteOpen={showCommandPalette}
            setShowCommandPalette={setShowCommandPalette}
          />
          <Content>
            {children}
            <Footer />
          </Content>
        </div>
      </div>
      <SideNavMobile />
    </div>
  );
};

const Content = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-full">
      <div className="mx-auto">
        <div className="pt-8 lg:pt-12 lg:pl-[19.5rem]">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
