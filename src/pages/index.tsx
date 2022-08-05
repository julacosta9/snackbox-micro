import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { allArticles, Article } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import { Article } from "contentlayer.config";

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};

export async function getStaticProps() {
  const articles: Article[] = allArticles.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return { props: { articles } };
}

const Home = ({ articles }: { articles: Article[] }) => {
  return (
    <>
      <Head>
        <title>Snackbox Micro Resources & Guides</title>
        <meta name="description" content="Snackbox Micro Resources & Guides" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="prose lg:prose-xl">
        {articles.map((article, idx) => (
          <ArticleCard key={idx} {...article} />
        ))}
      </section>
      <p className="text-2xl text-gray-700">This stack uses:</p>
      <div className="grid gap-3 pt-3 mt-3 mb-8 text-center md:grid-cols-3 lg:w-100">
        <TechnologyCard
          name="NextJS"
          description="The React framework for production"
          documentation="https://nextjs.org/"
        />
        <TechnologyCard
          name="TypeScript"
          description="Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale"
          documentation="https://www.typescriptlang.org/"
        />
        <TechnologyCard
          name="TailwindCSS"
          description="Rapidly build modern websites without ever leaving your HTML"
          documentation="https://tailwindcss.com/"
        />
      </div>
    </>
  );
};

const TechnologyCard = ({
  name,
  description,
  documentation,
}: TechnologyCardProps) => {
  return (
    <section className="flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105">
      <h2 className="text-lg text-gray-700">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <a
        className="mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
        href={documentation}
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </section>
  );
};

function ArticleCard(article: Article) {
  return (
    <div className="mb-8">
      <h2 className="text-xl">
        <Link href={article.url}>
          <a className="text-blue-700 hover:text-blue-900">{article.title}</a>
        </Link>
      </h2>
      <time
        dateTime={article.date}
        className="block text-xs text-gray-600 mb-2"
      >
        {format(parseISO(article.date), "LLLL d, yyyy")}
      </time>

      {article.tags.map((tag, id) => (
        <span className="mr-2" key={id}>
          {tag}
        </span>
      ))}

      <div
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: article.body.html }}
      />
    </div>
  );
}

export default Home;
