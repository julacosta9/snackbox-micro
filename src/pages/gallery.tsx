import type { ReactElement } from "react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Nav from "../components/Nav";
import GalleryFilters from "../components/GalleryFilters";
import CommandPalette from "../components/CommandPalette";
import Footer from "../components/Footer";
import LayoutGallery from "src/components/LayoutGallery";
import type { CaseTypes, ButtonColors, ButtonShapes } from "../lib/types";

export async function getStaticProps() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const { data } = await supabase
    .from("image-gallery")
    .select("*")
    .order("created_at");

  return {
    props: {
      images: data,
    },
  };
}

type Props = {
  children: React.ReactNode;
};

type Image = {
  id: number;
  case: string;
  buttonColors: string[];
  buttonShape: "concave" | "convex" | "mixed";
  src: string;
  credit: string;
  creditUrl: string;
};

const Gallery = ({ images }: { images: Image[] }) => {
  const [showCommandPalette, setShowCommandPalette] = useState<boolean>(false);

  const [allOneButtonColor, setAllOneButtonColor] = useState<boolean>(false);
  const [selectedButtonStore, setSelectedButtonStore] =
    useState<ButtonColors | null>();
  const [selectedCaseType, setSelectedCaseType] = useState<CaseTypes>({
    black: false,
    red: false,
    blue: false,
    white: false,
    evo: false,
    artworkClear: false,
    artworkSmoke: false,
    artworkRed: false,
    artworkBlue: false,
    artworkGreen: false,
    artworkYellow: false,
  });
  const [selectedButtonColors, setSelectedButtonColors] =
    useState<ButtonColors>({
      black: false,
      white: false,
      red: false,
      blueRoyal: false,
      blueLight: false,
      aqua: false,
      purple: false,
      pinkLight: false,
      yellow: false,
    });

  const [selectedButtonShapes, setSelectedButtonShapes] =
    useState<ButtonShapes>({
      mixed: false,
      concave: false,
      convex: false,
    });

  const handleCaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCaseType({
      ...selectedCaseType,
      [e.target.name]: e.target.checked,
    });
  };

  const handleOnebuttonColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (allOneButtonColor && selectedButtonStore) {
      setSelectedButtonColors(selectedButtonStore);
    }

    if (!allOneButtonColor) {
      // save currently selected colors
      setSelectedButtonStore(selectedButtonColors);
      // set selected colors all false
      setSelectedButtonColors({
        black: false,
        white: false,
        red: false,
        blueRoyal: false,
        blueLight: false,
        aqua: false,
        purple: false,
        pinkLight: false,
        yellow: false,
      });
    }

    setAllOneButtonColor(!allOneButtonColor);
  };

  const handleButtonColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!allOneButtonColor) {
      setSelectedButtonColors({
        ...selectedButtonColors,
        [e.target.name]: e.target.checked,
      });

      return;
    }

    // create array of colors selected
    const arr = Object.keys(selectedButtonColors).filter(
      (color) => selectedButtonColors[color]
    );

    // if no colors are selected or the clicked color is not checked
    if (arr.length === 0 || !e.target.checked) {
      setSelectedButtonColors({
        ...selectedButtonColors,
        [e.target.name]: e.target.checked,
      });
    }

    // if a color is selected, uncheck that color and check the clicked one
    if (arr.length === 1) {
      setSelectedButtonColors({
        ...selectedButtonColors,
        [arr[0] as string]: false,
        [e.target.name]: e.target.checked,
      });
    }

    return;
  };

  const handleButtonShapeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedButtonShapes({
      ...selectedButtonShapes,
      [e.target.name]: e.target.checked,
    });
  };

  const cases = Object.keys(selectedCaseType).filter((c) => {
    if (selectedCaseType[c]) return c;
  });
  const colors = Object.keys(selectedButtonColors).filter((color) => {
    if (selectedButtonColors[color]) return color;
  });
  const shapes = Object.keys(selectedButtonShapes).filter((shape) => {
    if (selectedButtonShapes[shape]) return shape;
  });

  const buttonColorMatches = (
    selectedButtonColors: string[],
    imageButtonColors: string[]
  ) =>
    selectedButtonColors.filter((value) => {
      if (!allOneButtonColor && imageButtonColors.includes(value)) {
        return value;
      }

      if (
        allOneButtonColor &&
        imageButtonColors.length === 1 &&
        imageButtonColors.includes(value)
      ) {
        return value;
      }
    });

  const filteredImages = images.filter((image) => {
    // no filters are selected
    if (
      cases.length === 0 &&
      colors.length === 0 &&
      shapes.length === 0 &&
      !allOneButtonColor
    )
      return image;

    // all filters selected
    if (cases.length > 0 && colors.length > 0 && shapes.length > 0) {
      if (
        cases.includes(image.case) &&
        buttonColorMatches(colors, image.buttonColors).length >=
          colors.length &&
        shapes.includes(image.buttonShape)
      )
        return image;
    }

    // 1 filter selected
    if (
      cases.length > 0 &&
      colors.length === 0 &&
      shapes.length === 0 &&
      !allOneButtonColor
    ) {
      if (cases.includes(image.case)) return image;
    }

    if (cases.length === 0 && colors.length > 0 && shapes.length === 0) {
      if (
        buttonColorMatches(colors, image.buttonColors).length >= colors.length
      )
        return image;
    }

    if (
      cases.length === 0 &&
      colors.length === 0 &&
      shapes.length > 0 &&
      !allOneButtonColor
    ) {
      if (shapes.includes(image.buttonShape)) return image;
    }

    if (
      cases.length === 0 &&
      colors.length === 0 &&
      shapes.length === 0 &&
      allOneButtonColor
    ) {
      if (image.buttonColors.length === 1) return image;
    }

    // 2 filters selected
    if (cases.length > 0 && colors.length > 0 && shapes.length === 0) {
      if (
        cases.includes(image.case) &&
        buttonColorMatches(colors, image.buttonColors).length >= colors.length
      )
        return image;
    }

    if (
      cases.length > 0 &&
      colors.length === 0 &&
      shapes.length > 0 &&
      !allOneButtonColor
    ) {
      if (cases.includes(image.case) && shapes.includes(image.buttonShape))
        return image;
    }

    if (
      cases.length > 0 &&
      colors.length === 0 &&
      shapes.length === 0 &&
      allOneButtonColor
    ) {
      if (cases.includes(image.case) && image.buttonColors.length === 1)
        return image;
    }

    if (cases.length === 0 && colors.length > 0 && shapes.length > 0) {
      if (
        buttonColorMatches(colors, image.buttonColors).length >=
          colors.length &&
        shapes.includes(image.buttonShape)
      )
        return image;
    }

    if (
      cases.length === 0 &&
      colors.length === 0 &&
      shapes.length > 0 &&
      allOneButtonColor
    ) {
      if (cases.includes(image.case) && image.buttonColors.length === 1)
        return image;
    }

    // 3 filters selected
    if (
      cases.length > 0 &&
      colors.length === 0 &&
      shapes.length > 0 &&
      allOneButtonColor
    ) {
      if (
        cases.includes(image.case) &&
        shapes.includes(image.buttonShape) &&
        image.buttonColors.length === 1
      )
        return image;
    }
  });

  return (
    <>
      <Head>
        <title>Snackbox Micro Resources & Guides</title>
        <meta name="description" content="Snackbox Micro Resources & Guides" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
              <section className="py-8">
                <div className="grid grid-cols-2 gap-y-6 gap-x-6 sm:grid-cols-3">
                  {filteredImages.map((image: Image) => (
                    <BlurImage image={image} key={image.id} />
                  ))}
                </div>
              </section>
              <Footer />
            </Content>
          </div>
        </div>
        <GalleryFilters
          allOneButtonColor={allOneButtonColor}
          selectedCaseType={selectedCaseType}
          selectedButtonColors={selectedButtonColors}
          selectedButtonShapes={selectedButtonShapes}
          handleOnebuttonColorChange={handleOnebuttonColorChange}
          handleCaseChange={handleCaseChange}
          handleButtonColorChange={handleButtonColorChange}
          handleButtonShapeChange={handleButtonShapeChange}
        />
      </div>
    </>
  );
};

function BlurImage({ image }: { image: Image }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div
      className={`aspect-square h-full cursor-pointer overflow-hidden rounded-lg ring-1 ring-base-200 hover:opacity-75 ${
        isLoading ? "bg-base-300" : ""
      } `}
    >
      <Image
        alt={`Photo of Snackbox Micro by ${image.credit}`}
        src={image.src}
        objectFit="cover"
        height="400px"
        width="400px"
        className={`duration-700 ease-in-out
            ${
              isLoading
                ? "scale-110 blur-xl grayscale"
                : "scale-100 blur-0 grayscale-0"
            }
          `}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
}

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

Gallery.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGallery>{page}</LayoutGallery>;
};

export default Gallery;
