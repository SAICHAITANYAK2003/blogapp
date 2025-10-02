const Footer = () => {
  return (
    <>
      <footer className="flex flex-col bg-seconday/20 items-center justify-around w-full py-16 text-sm ">
        <div>
          <span>Developed by </span>
          <a
            className="underline"
            target="_blank"
            href="https://www.linkedin.com/in/saichaitanyakoduri"
          >
            saichaitanyak .
          </a>
        </div>

        <h1 className="mt-4">Made With ❤️ and reactjs</h1>

        <p className="mt-4 text-center">
          Copyright © {new Date().getFullYear()}. All rights reservered.
        </p>
      </footer>
    </>
  );
};

export default Footer;
