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
        className="drawer-overlay backdrop-filter"
      ></label>
      <nav
        id="nav"
        className="bg-white lg:text-sm lg:leading-6 relative w-1/2 min-w-[250px]"
      >
        <div className="flex flex-col gap-y-1 pt-2 pl-6 pr-2">
          {toc.map((section, i) => (
            <div key={i} className="mb-2">
              <div className="font-bold py-3 transition rounded text-base-content mb-2">
                {section.sectionTitle}
              </div>
              {section.articles.map((article, j) => (
                <div
                  className="py-2 text-lg hover:text-base-content text-base-content/60 transition border-l hover:border-primary rounded-tr rounded-br"
                  key={j}
                >
                  <span className="ml-6">{article.title}</span>
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
