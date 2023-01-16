const Footer: React.FC = () => {
  return (
    <footer className="footer mb-6 rounded-lg bg-base-200 p-10 text-base-content">
      <div>
        <div className="flex-0 inline-flex cursor-pointer text-lg font-extrabold leading-normal text-gray-700 transition-all duration-200 lg:text-3xl">
          <span className="lowercase text-secondary transition">sbmicro</span>{" "}
          <span className="capitalize text-base-content">hub</span>
        </div>
        <p className="max-w-sm leading-6">
          This site is not affiliated with the real makers of the Snackbox
          Micro, Junkfood Custom Arcades.
          <br />
          <br />
          It&apos;s simply a site created by a fan. 🔮
          <br />
          You can check out my{" "}
          <a
            href="https://github.com/julacosta9"
            target="_blank"
            rel="noreferrer"
            className="link link-hover text-accent"
          >
            GitHub
          </a>{" "}
          and{" "}
          <a
            href="https://www.julianacosta.dev/"
            target="_blank"
            rel="noreferrer"
            className="link link-hover text-accent"
          >
            portfolio
          </a>
          .
        </p>
      </div>
      <div>
        <span className="footer-title">Junkfood Custom Arcades</span>
        <a
          href="https://junkfoodarcades.com/"
          target="_blank"
          rel="noreferrer"
          className="link link-hover"
        >
          Website (buy a micro here!)
        </a>
        <a
          href="https://discord.gg/egfTusUpPY"
          target="_blank"
          rel="noreferrer"
          className="link link-hover"
        >
          Discord
        </a>
        <a
          href="http://youtube.com/channel/UCoIIhYXah87yEV_PrS4ASTw"
          target="_blank"
          rel="noreferrer"
          className="link link-hover"
        >
          YouTube
        </a>
        <a
          href="https://twitter.com/junkfoodarcades"
          target="_blank"
          rel="noreferrer"
          className="link link-hover"
        >
          Twitter
        </a>
        <a
          href="https://www.instagram.com/junkfoodarcades/?igshid=YWJhMjlhZTc%3D"
          target="_blank"
          rel="noreferrer"
          className="link link-hover"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
