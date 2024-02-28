import "./globals.css";
import Footer from "@/components/footer/Footer";
export const metadata = {
  title: "mogul",
  description: "모두의 굴, mogul",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
