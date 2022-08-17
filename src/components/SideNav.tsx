import { useState, useEffect } from "react";
import { allArticles, Article } from "contentlayer/generated";

type toc = {
  sectionTitle: string;
  articles: Array<Article | null>;
};

type NavProps = {
  isCommandPaletteOpen: boolean;
  setShowCommandPalette: (value: boolean) => void;
  tocTree: toc[];
};

//   const sortedArticles: Article[] = allArticles.sort((a, b) => {
//     return parseInt(a.pathSegments.order) - parseInt(b.pathSegments.order);
//   });

const SideNav: React.FC<NavProps> = ({
  isCommandPaletteOpen,
  setShowCommandPalette,
}: NavProps) => {
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
    <div className="hidden lg:block fixed z-20 inset-0 top-[5rem] left-[max(0px,calc(50%-40rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
      <nav id="nav" className="lg:text-sm lg:leading-6 relative">
        <div className="sticky top-0 -ml-0.5 pointer-events-none">
          <div className="h-8 bg-white"></div>
          <div className="bg-white relative pointer-events-auto">
            <button
              type="button"
              className="hidden w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300"
              onClick={(e) => setShowCommandPalette(!isCommandPaletteOpen)}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                aria-hidden="true"
                className="mr-3 flex-none"
              >
                <path
                  d="m19 19-3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <circle
                  cx="11"
                  cy="11"
                  r="6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></circle>
              </svg>
              Quick search...
              <span className="ml-auto flex-none text-xs font-semibold kbd text-gray-500">
                ⌘K
              </span>
            </button>
          </div>
          <div className="h-8 bg-gradient-to-b from-white"></div>
        </div>
        <div className="flex flex-col gap-y-1">
          {toc.map((section, i) => (
            <div key={i} className="mb-2">
              <div className="font-bold py-3 transition rounded text-base-content">
                {section.sectionTitle}
              </div>
              {section.articles.map((article, j) => (
                <div
                  className="py-1 hover:text-base-content text-base-content/60 transition border-l hover:border-primary rounded-tr rounded-br"
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

export default SideNav;
