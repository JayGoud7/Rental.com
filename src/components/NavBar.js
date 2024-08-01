"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Image from "next/image";
import UnreadMessageCount from "./UnreadMessageCount";
import { usePathname } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { IoMenu } from "react-icons/io5";

const NavBar = () => {
  const [isopen, setopen] = useState(false);
  const [isopenm, setopenm] = useState(false);
  const [providers, setProviders] = useState(false);

  const { data: session } = useSession();
  const profileImg = session?.user?.image;

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  const handlemenu = () => {
    setopen(!isopen);
  };

  const handlemenum = () => {
    setopenm(!isopenm);
  };

  const pathname = usePathname();

  return (
    <>
      <nav>
        <div className="nav-mobile">
          <button onClick={handlemenum} className="menu-btn">
            <IoMenu />
          </button>
          <Link href={"/"}>
            <h2>RENTAL.com</h2>
          </Link>
          {isopenm && (
            <div className="mobile-menu">
              <ul>
                <li>
                  <Link
                    className={` ${pathname === "/" ? "active" : "lnk"}`}
                    href={"/"}
                    onClick={() => setopenm(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className={` ${
                      pathname === "/properties" ? "active" : "lnk"
                    }`}
                    href={"/properties"}
                    onClick={() => setopenm(false)}
                  >
                    Property
                  </Link>
                </li>
                {session && (
                  <li>
                    <Link
                      className={` ${
                        pathname === "/properties/add" ? "active" : "lnk"
                      }`}
                      href={"/properties/add"}
                      onClick={() => setopenm(false)}
                    >
                      Add property
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="nav-1">
          <Link href={"/"}>
            <h2>RENTAL.com</h2>
          </Link>
          <ul>
            <li>
              <Link
                className={` ${pathname === "/" ? "active" : "lnk"}`}
                href={"/"}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={` ${pathname === "/properties" ? "active" : "lnk"}`}
                href={"/properties"}
              >
                Property
              </Link>
            </li>
            {session && (
              <li>
                <Link
                  className={` ${
                    pathname === "/properties/add" ? "active" : "lnk"
                  }`}
                  href={"/properties/add"}
                >
                  Add property
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="nav-2">
          {!session && (
            <>
              {providers &&
                Object.values(providers).map((provider, index) => {
                  return (
                    <button
                      className="login-btn"
                      onClick={() => signIn(provider.id)}
                      key={index}
                    >
                      <FcGoogle className="google" /> Login
                    </button>
                  );
                })}
            </>
          )}

          {session && (
            <>
              <UnreadMessageCount session={session} />
              <Link href={""} onClick={handlemenu}>
                <div className="proImg">
                  <Image
                    src={profileImg}
                    width={30}
                    height={30}
                    alt="loginimg"
                  />
                </div>
              </Link>
            </>
          )}
        </div>
      </nav>
      {isopen && (
        <div className="pro_menu">
          <Link
            href={"/profile"}
            className="lnk-2"
            onClick={() => {
              setopen(false);
            }}
          >
            Your Profile
          </Link>
          <Link
            href={"/properties/saved"}
            className="lnk-2"
            onClick={() => {
              setopen(false);
            }}
          >
            Saved Properties
          </Link>
          <button
            className="lnk-2"
            onClick={() => {
              setopen(false);
              signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
};

export default NavBar;
