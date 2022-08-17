import { useState, useEffect } from "react";
import { allArticles, Article } from "contentlayer/generated";

type toc = {
  sectionTitle: string;
  articles: Array<Article | null>;
};

const SideNavMobile: React.FC = () => {
  const [toc, setToc] = useState<any>([]);

  useEffect(() => {
    const tocTree: toc[] = [
      {
        sectionTitle: "Section A",
        articles: [],
      },
      {
        sectionTitle: "Section B",
        articles: [],
      },
      {
        sectionTitle: "Section C",
        articles: [],
      },
      {
        sectionTitle: "Section D",
        articles: [],
      },
      {
        sectionTitle: "Section E",
        articles: [],
      },
    ];

    allArticles.forEach((article) => {
      if (article.pathSegments.sectionPathName === "section-a")
        tocTree[0]?.articles.push(article);
      if (article.pathSegments.sectionPathName === "section-b")
        tocTree[1]?.articles.push(article);
      if (article.pathSegments.sectionPathName === "section-c")
        tocTree[2]?.articles.push(article);
      if (article.pathSegments.sectionPathName === "section-d")
        tocTree[3]?.articles.push(article);
      if (article.pathSegments.sectionPathName === "section-e")
        tocTree[4]?.articles.push(article);
    });

    setToc(tocTree);
  }, []);

  return (
    <div className="overflow-y-auto drawer-side">
      <label
        htmlFor="my-drawer"
        className="drawer-overlay backdrop-blur-sm"
      ></label>
      <nav
        id="nav"
        className="bg-base-100 lg:text-sm lg:leading-6 relative w-1/2 min-w-[250px] shadow-lg border-r border-base-200"
      >
        <div className="flex flex-col gap-y-1 pt-2 pl-6 pr-2">
          {toc.map((section: toc, i: number) => (
            <div key={i} className="mb-2">
              <div className="font-bold text-xs py-3 transition rounded text-base-content/80 mb-2">
                {section.sectionTitle}
              </div>
              {section.articles.map((article: Article | null, j) => (
                <div
                  className="py-2 hover:text-primary-content text-base-content transition border-l border-base-content/20 hover:border-primary hover:bg-primary/80 rounded-tr rounded-br"
                  key={j}
                >
                  <span className="ml-6">{article?.title}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SideNavMobile;
