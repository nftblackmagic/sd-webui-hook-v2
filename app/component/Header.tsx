import Link from "next/link";

const navitems = [
  { name: "Upscale", link: "/upscale" },
  { name: "Img2img", link: "/img2img" },
  { name: "Txt2img", link: "/txt2img" },
];

export const Header = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navitems.map((item) => {
            return (
              <li key={item.name}>
                <Link href={item.link}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
