import type { ReactElement } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import LayoutGallery from "src/components/LayoutGallery";

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
  const filteredImages = images.map((image) => {});

  return (
    <>
      <Head>
        <title>Snackbox Micro Resources & Guides</title>
        <meta name="description" content="Snackbox Micro Resources & Guides" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="py-8">
        <div className="grid grid-cols-2 gap-y-6 gap-x-6 sm:grid-cols-3">
          {images.map((image: Image) => (
            <BlurImage image={image} key={image.id} />
          ))}
        </div>
      </section>
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

Gallery.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGallery>{page}</LayoutGallery>;
};

export default Gallery;
