
import Navbar from "./Components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Todo App",
  description: "mern stack todo app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
