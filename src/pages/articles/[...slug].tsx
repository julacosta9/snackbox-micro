import type { ReactElement } from "react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import LayoutDefault from "src/components/LayoutDefault";
import { useMDXComponent } from "next-contentlayer/hooks";
import { allArticles, Article } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { ParsedUrlQuery } from "querystring";

type Props = {
  article: Article | undefined;
};

interface Params extends ParsedUrlQuery {
  slug: string[];
}

export async function getStaticPaths() {
  const paths: string[] = allArticles.map((article) => {
    return `/articles/${article.pathSegments.sectionPathName}/${article.pathSegments.articlePathName}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<Props, Params> = (context) => {
  const params = context.params; // ! is a non-null assertion
  const article: Article | undefined = allArticles.find(
    (article) =>
      article.pathSegments.sectionPathName === params?.slug[0] &&
      article.pathSegments.articlePathName === params?.slug[1]
  );

  return {
    props: {
      article,
    },
  };
};

const ArticlePage = ({ article }: { article: Article }) => {
  const MDXContent = useMDXComponent(article.body.code);

  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>
      <article className="mx-auto max-w-2xl py-16">
        <div className="mb-6 text-center">
          <Link href="/">
            <a className="text-center text-sm font-bold uppercase text-blue-700">
              {article.pathSegments.sectionPathName.replace("-", " ")}
            </a>
          </Link>
        </div>
        <div className="mb-6 text-center">
          <h1 className="mb-1 text-3xl font-bold">{article.title}</h1>
          <div className="text-sm text-slate-600">
            Last edited:
            <time dateTime={article.last_edited} className="ml-2">
              {format(parseISO(article.last_edited), "LLLL d, yyyy")}
            </time>
          </div>
        </div>
        <MDXContent />
      </article>
    </>
  );
};

ArticlePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default ArticlePage;
