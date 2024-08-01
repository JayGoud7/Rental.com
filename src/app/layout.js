import { Inter } from "next/font/google";
import "../components/global.css";
import NavBar from "../components/NavBar";
import AuthProvider from "../components/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "../context/GlobalContext";
import "photoswipe/dist/photoswipe.css";
import Footer from "../components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RENTAL.COM",
  description: "Find your rental property",
  keywords: "rental,find rentals,find properties",
  icons: {
    icon: [
      {
        url: "/images/house.svg",
        href: "/images/house.svg",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body className={inter.className}>
            <header>
              <NavBar />
            </header>
            <main>{children}</main>

            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
}
