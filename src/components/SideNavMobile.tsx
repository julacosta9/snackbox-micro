import { useState, useEffect } from "react";

const SideNavMobile: React.FC = () => {
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
    <div className="overflow-y-auto drawer-side">
      <label
        htmlFor="my-drawer"
        className="drawer-overlay backdrop-filter"
      ></label>
      <nav
        id="nav"
        className="bg-white lg:text-sm lg:leading-6 relative w-1/2 min-w-[300px]"
      >
        <div className="flex flex-col gap-y-1 pt-8 px-2">
          {toc.map((i) => (
            <div
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 transition rounded"
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

export default SideNavMobile;
