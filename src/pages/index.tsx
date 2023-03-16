// import { createClient } from "@supabase/supabase-js";
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

// export async function getStaticProps() {
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL || "",
//     process.env.SUPABASE_SERVICE_ROLE_KEY || ""
//   );

//   const { data } = await supabase
//     .from("image-gallery")
//     .select("*")
//     .eq("isActive", true)
//     .order("created_at", { ascending: false });

//   return {
//     props: {
//       images: data,
//     },
//   };
// }

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
  const [showForm, setShowForm] = useState<boolean>(true);

  useEffect(() => {
   
  },);


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
          <SubmitMicroForm isOpen={showForm} setIsOpen={setShowForm} />
      {/* <div className="drawer-mobile drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
  
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
      </div> */}
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
