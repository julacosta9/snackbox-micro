import { useState } from "react";
import Nav from "./Nav";
import GalleryFilters from "./GalleryFilters";
import CommandPalette from "./CommandPalette";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

const LayoutGallery = ({ children }: Props) => {
  const [showCommandPalette, setShowCommandPalette] = useState<boolean>(false);

  return (
    <div className="drawer-mobile drawer">
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
        <div className="mx-auto flex max-w-7xl px-4 sm:px-6 md:px-8">
          <Content>
            {children}
            <Footer />
          </Content>
        </div>
      </div>
      <GalleryFilters />
    </div>
  );
};

const Content = ({ children }: Props) => {
  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto">
        <div className="pt-8 lg:pt-12 lg:pl-[19.5rem]">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default LayoutGallery;