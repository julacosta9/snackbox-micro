import type { ReactElement } from "react";
import Head from "next/head";
import Link from "next/link";
import LayoutDefault from "src/components/LayoutDefault";
import { allArticles, Article } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { compareDesc, format, parseISO } from "date-fns";

export async function getStaticProps() {
  const articles: Article[] = allArticles.sort((a, b) => {
    return compareDesc(new Date(a.last_edited), new Date(b.last_edited));
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
    </>
  );
};

function ArticleCard(article: Article) {
  const MDXContent = useMDXComponent(article.body.code);
  return (
    <div className="mb-8">
      <h2 className="text-xl">
        <Link
          href={`/articles/${article.pathSegments.sectionPathName}/${article.pathSegments.articlePathName}`}
        >
          <a className="text-base-content">{article.title}</a>
        </Link>
      </h2>
      <time
        dateTime={article.last_edited}
        className="mb-2 block text-xs text-base-content"
      >
        {format(parseISO(article.last_edited), "LLLL d, yyyy")}
      </time>

      {article.tags?.map((tag, id) => (
        <span className="mr-2" key={id}>
          {tag}
        </span>
      ))}

      <div className="text-sm">
        <MDXContent />
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default Home;
