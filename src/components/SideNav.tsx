import { useState, useEffect } from "react";

const SideNav: React.FC = () => {
  const navArr = () => {
    let arr = [];
    for (let i = 1; i < 51; i++) {
      arr.push(i);
    }
    return arr;
  };
  const [toc, setToc] = useState(navArr());

  useEffect(() => {
    setToc(navArr());
  }, []);

  return (
    <div className="hidden lg:block fixed z-20 inset-0 top-[5rem] left-[max(0px,calc(50%-42rem))] right-auto w-[19.5rem] pb-10 px-8 overflow-y-auto">
      <nav id="nav" className="lg:text-sm lg:leading-6 relative">
        <div className="sticky top-0 -ml-0.5 pointer-events-none">
          <div className="h-10 bg-white"></div>
          <div className="bg-white relative pointer-events-auto">
            <button
              type="button"
              className="hidden w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300"
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
              <span className="ml-auto pl-3 flex-none text-xs font-semibold">
                ⌘K
              </span>
            </button>
          </div>
          <div className="h-8 bg-gradient-to-b from-white"></div>
        </div>
        <div className="flex flex-col gap-y-1">
          {toc.map((i) => (
            <div
              className="px-4 py-3 bg-slate-200 hover:bg-slate-300 transition rounded"
              key={i}
            >
              {i}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
