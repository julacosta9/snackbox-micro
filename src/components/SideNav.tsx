import React, { useState, useEffect } from "react";
import { allArticles, Article } from "contentlayer/generated";

type toc = {
  sectionTitle: string;
  articles: Array<Article | null>;
};

type NavProps = {
  isCommandPaletteOpen: boolean;
  setShowCommandPalette: (value: boolean) => void;
  // tocTree: toc[];
};

//   const sortedArticles: Article[] = allArticles.sort((a, b) => {
//     return parseInt(a.pathSegments.order) - parseInt(b.pathSegments.order);
//   });

const SideNav: React.FC<NavProps> = ({
  isCommandPaletteOpen,
  setShowCommandPalette,
}: NavProps) => {
  const [toc, setToc] = useState<toc[]>([]);
  const [isMacOs, setMacOs] = useState<boolean>(false);
  const [showHover, setShowHover] = useState<boolean>(false);
  const [noTransitionDuration, setNoTransitionDuration] =
    useState<boolean>(true);
  const [translateY, setTranslateY] = useState<number>(0);

  const enableTransitionDuration = () => {
    setNoTransitionDuration(true);
  };

  let timer: null | ReturnType<typeof setTimeout> = null;

  const handleHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setTranslateY(e.target.offsetTop);
    setShowHover(true);
    if (timer) {
      clearTimeout(timer);
    }
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setShowHover(false);
    setNoTransitionDuration(false);
    timer = setTimeout(enableTransitionDuration, 1000);
  };

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

  useEffect(() => {
    const isMac =
      typeof window !== "undefined"
        ? navigator.userAgent.indexOf("Mac") >= 0
        : false;

    setMacOs(isMac);
  }, []);

  return (
    <div className="hidden lg:block fixed z-20 inset-0 top-[5rem] left-[max(0px,calc(50%-40rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
      <nav id="nav" className="lg:text-sm lg:leading-6 relative">
        <div className="sticky top-0 -ml-0.5 pointer-events-none z-10">
          <div className="h-8 bg-base-100"></div>
          <div className="bg-base-100 relative pointer-events-auto">
            <button
              type="button"
              className="hidden w-full lg:flex items-center text-sm leading-6 text-base-content/40 rounded-md ring-1 ring-base-200 shadow py-1.5 pl-2 pr-3 hover:ring-primary"
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
              <span className="ml-auto flex-none text-xs font-semibold kbd text-base-content/60">
                {isMacOs ? "⌘K" : "CTRL + K"}
              </span>
            </button>
          </div>
          <div className="h-8 bg-gradient-to-b from-base-100"></div>
        </div>
        <div className="flex flex-col gap-y-1 relative">
          <div
            className={`${showHover ? "opacity-100" : "opacity-0"} ${
              noTransitionDuration ? "duration-[0ms]" : "duration-75"
            } w-full bg-primary h-10 -z-10 absolute top-0 left-0 rounded-lg ease-in transition-all`}
            style={{ transform: `translateY(${translateY}px)` }}
          ></div>
          {toc.map((section: toc, i: number) => (
            <div key={i} className="mb-2">
              <div className="font-bold py-3 rounded text-base-content/90 text-xs">
                {section.sectionTitle}
              </div>
              {section.articles.map((article: Article | null, j) => (
                <div
                  className={`${
                    noTransitionDuration ? "duration-[0ms]" : "duration-200"
                  } py-2 hover:text-primary-content text-base-content/60 transition-all duration-75 border-l border-base-content/10 hover:border-transparent hover:rounded-tr-lg hover:rounded-br-lg`}
                  key={j}
                  onMouseEnter={(
                    e: React.MouseEvent<HTMLDivElement, MouseEvent>
                  ) => handleHover(e)}
                  onMouseLeave={(
                    e: React.MouseEvent<HTMLDivElement, MouseEvent>
                  ) => handleMouseLeave(e)}
                >
                  <span className="ml-5 w-full">{article?.title}</span>
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
