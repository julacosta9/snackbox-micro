import type { ReactElement } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import LayoutGallery from "src/components/LayoutGallery";
import { allArticles, Article } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { compareDesc, format, parseISO } from "date-fns";

export async function getStaticProps() {
  const articles: Article[] = allArticles.sort((a, b) => {
    return compareDesc(new Date(a.last_edited), new Date(b.last_edited));
  });
  return { props: { articles } };
}

const Gallery = ({ articles }: { articles: Article[] }) => {
  return (
    <>
      <Head>
        <title>Snackbox Micro Resources & Guides</title>
        <meta name="description" content="Snackbox Micro Resources & Guides" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="prose lg:prose-xl">
        <div className="w-full">Gallery 2</div>
      </section>
    </>
  );
};

Gallery.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGallery>{page}</LayoutGallery>;
};

export default Gallery;
