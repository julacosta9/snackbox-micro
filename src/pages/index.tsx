import { createClient } from "@supabase/supabase-js";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import { ReactElement, useEffect, useState } from "react";
import LayoutGallery from "src/components/LayoutGallery";
// import CommandPalette from "../components/CommandPalette";
import SubmitMicroForm from "src/components/SubmitMicroForm";
import Footer from "../components/Footer";
import GalleryFilters from "../components/GalleryFilters";
import ImageLightBox from "../components/ImageLightBox";
import Nav from "../components/Nav";
import type { ButtonColors, ButtonShapes, CaseTypes } from "../lib/types";

export async function getStaticProps() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const { data } = await supabase
    .from("image-gallery")
    .select("*")
    .eq("isActive", true)
    .order("created_at", { ascending: false });

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
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
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

  const router = useRouter();

  useEffect(() => {
    if (!router.query.photoId) return;

    let found: Image | undefined = images.find(
      (img) => img.id === parseInt(router.query.photoId as string)
    );

    if (found) setSelectedImage(found);
  }, [router, images]);

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

  const handleImageSelect = (image: Image) => {
    setSelectedImage(image);
    if (!image) router.push("/");
  };

  const handleNextImg = () => {
    let currentImgIndex: number | undefined = filteredImages.findIndex(
      (img) => img.id === parseInt(router.query.photoId as string)
    );

    let nextImg = currentImgIndex + 1;

    if (!filteredImages[nextImg]) {
      router.push(`/?photoId=${filteredImages[0]?.id}`);
      setSelectedImage(filteredImages[0] as any);
    } else {
      router.push(`/?photoId=${filteredImages[nextImg]?.id}`);
      setSelectedImage(filteredImages[nextImg] as any);
    }
  };

  const handlePrevImg = () => {
    let currentImgIndex: number | undefined = filteredImages.findIndex(
      (img) => img.id === parseInt(router.query.photoId as string)
    );

    let prevImg = currentImgIndex - 1;
    let lastIndex = filteredImages.length - 1;

    if (!filteredImages[prevImg]) {
      router.push(`/?photoId=${filteredImages[lastIndex]?.id}`);
      setSelectedImage(filteredImages[lastIndex] as any);
    } else {
      router.push(`/?photoId=${filteredImages[prevImg]?.id}`);
      setSelectedImage(filteredImages[prevImg] as any);
    }
  };

  return (
    <>
      <Script
        strategy="afterInteractive"
        data-website-id="d65923d7-a7ec-4ce3-911f-d2ad8db5f915"
        src="https://sbmicrohub-analytics-gcmjnqk9w-julianacosta.vercel.app/umami.js"
        data-do-not-track="true"
      />
      <Head>
        <title>Snackbox Micro Image Gallery</title>
        <meta
          name="description"
          content="View and filter images of Snackbox Micros to get ideas for your own build."
        />
        <link rel="icon" href="/favicon.ico" />
        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://sbmicrohub.com/" />
        <meta name="twitter:title" content="Snackbox Micro Image Gallery" />
        <meta
          name="twitter:description"
          content="View and filter images of Snackbox Micros to get ideas for your own build."
        />
        <meta
          name="twitter:image"
          content="https://vjdhwnhtmmpuhqgpozhy.supabase.co/storage/v1/object/public/misc/opengraph.png?t=2023-01-16T09%3A53%3A24.523Z"
        />

        {/* OpenGraph */}
        <meta property="og:type" content="webiste" />
        <meta property="og:title" content="Snackbox Micro Image Gallery" />
        <meta
          property="og:description"
          content="View and filter images of Snackbox Micros to get ideas for your own build"
        />
        <meta property="og:url" content="https://sbmicrohub.com/" />
        <meta
          property="og:image"
          content="https://vjdhwnhtmmpuhqgpozhy.supabase.co/storage/v1/object/public/misc/opengraph.png?t=2023-01-16T09%3A53%3A24.523Z"
        />
      </Head>
      <div className="drawer-mobile drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* <CommandPalette
            isOpen={showCommandPalette}
            setIsOpen={setShowCommandPalette}
          /> */}
          <SubmitMicroForm isOpen={showForm} setIsOpen={setShowForm} />
          <ImageLightBox
            image={selectedImage}
            isOpen={!!selectedImage}
            handleImageSelect={handleImageSelect}
            handleNextImg={handleNextImg}
            handlePrevImg={handlePrevImg}
          />
          <Nav
            isCommandPaletteOpen={showCommandPalette}
            setShowCommandPalette={setShowCommandPalette}
          />
          <div className="mx-auto flex max-w-7xl px-4 sm:px-6 md:px-8">
            <Content>
              <section className="py-8">
                <div className="grid grid-cols-2 gap-y-4 gap-x-4 sm:grid-cols-3">
                  {filteredImages.map((image: Image, i: number) => (
                    <BlurImage
                      image={image}
                      key={image.id}
                      handleImageSelect={handleImageSelect}
                    />
                  ))}
                </div>
              </section>
              <Footer />
            </Content>
          </div>
        </div>
        <GalleryFilters
          isSubmitFormOpen={showForm}
          setShowSubmitForm={setShowForm}
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

function BlurImage({
  image,
  handleImageSelect,
}: {
  image: Image;
  handleImageSelect: any;
}) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Link href={`/?photoId=${image.id.toString()}`} prefetch={false} shallow>
      <div
        onClick={() => handleImageSelect(image)}
        className={`relative aspect-square h-full cursor-pointer overflow-hidden rounded-lg hover:opacity-75 ${
          isLoading ? "bg-base-300" : ""
        } `}
      >
        <Image
          alt={`Photo of Snackbox Micro by ${image.credit}`}
          style={{ transform: "translate3d(0, 0, 0)" }}
          src={image.src}
          objectFit="cover"
          height="290px"
          width="290px"
          className={`transform duration-700 ease-in-out will-change-auto
        ${
          isLoading
            ? "scale-110 blur-xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        }
        `}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
    </Link>
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
