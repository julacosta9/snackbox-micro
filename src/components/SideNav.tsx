import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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

  const router = useRouter();

  const isActive = (article: Article) =>
    router.asPath ===
    `/articles/${article.pathSegments.sectionPathName}/${article.pathSegments.articlePathName}`;

  const enableTransitionDuration = () => {
    setNoTransitionDuration(true);
  };

  let timer: null | ReturnType<typeof setTimeout> = null;

  const handleHover = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // @ts-ignore
    setTranslateY(e.target.offsetTop);
    setShowHover(true);
    if (timer) {
      clearTimeout(timer);
    }
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
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
    <div className="drawer-side overflow-y-auto">
      <label
        htmlFor="my-drawer"
        className="drawer-overlay backdrop-blur-sm"
      ></label>
      <div className="fixed inset-0 right-auto z-20 w-[19.5rem] overflow-y-auto border-r border-base-200 bg-base-100 px-8 pb-10 shadow-lg lg:top-[5rem] lg:left-[max(0px,calc(50%-40rem))] lg:block lg:border-0 lg:shadow-none">
        <aside id="nav" className="relative pt-4 pb-2 lg:pt-0 lg:text-sm">
          <div className="pointer-events-none sticky top-0 z-10 -ml-0.5 hidden lg:block">
            <div className="h-8 bg-base-100"></div>
            <div className="pointer-events-auto relative bg-base-100">
              <button
                type="button"
                className="hidden w-full items-center rounded-md py-1.5 pl-2 pr-3 text-sm leading-6 text-base-content/40 shadow ring-1 ring-base-300 hover:ring-primary lg:flex"
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
                <span className="kbd ml-auto flex-none text-xs font-semibold text-base-content/60">
                  {isMacOs ? "⌘K" : "CTRL + K"}
                </span>
              </button>
            </div>
            <div className="h-8 bg-gradient-to-b from-base-100"></div>
          </div>
          <div className="relative flex flex-col gap-y-1">
            <div
              className={`${showHover ? "opacity-100" : "opacity-0"} ${
                noTransitionDuration ? "duration-[0ms]" : "duration-75"
              } absolute top-0 left-0 -z-10 h-10 w-full rounded-lg bg-primary transition-all ease-in`}
              style={{ transform: `translateY(${translateY}px)` }}
            ></div>
            {toc.map((section: toc, i: number) => (
              <div key={i} className="mb-2">
                <div className="rounded py-3 text-xs font-bold text-base-content/90">
                  {section.sectionTitle}
                </div>
                {section.articles.map((article: Article | null, j) => (
                  <Link
                    href={`/articles/${article?.pathSegments.sectionPathName}/${article?.pathSegments.articlePathName}`}
                    key={j}
                  >
                    <a
                      className={`${
                        noTransitionDuration ? "duration-[0ms]" : "duration-200"
                      } ${
                        isActive(article!)
                          ? "rounded-lg bg-primary font-bold text-primary-content hover:bg-primary-focus"
                          : ""
                      } block border-l border-base-content/10 py-2 text-base-content/60 transition-all duration-75 hover:rounded-tr-lg hover:rounded-br-lg hover:border-transparent hover:text-primary-content`}
                      onMouseEnter={(
                        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                      ) => handleHover(e)}
                      onMouseLeave={(
                        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                      ) => handleMouseLeave(e)}
                    >
                      <span className="ml-5 w-full">{article?.title}</span>
                    </a>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SideNav;
