import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getContent } from "@/lib/content";

export default async function SiteLayout({ children }) {
  const content = await getContent();
  return (
    <>
      <Navbar site={content.site} />
      <main>{children}</main>
      <Footer site={content.site} />
      <WhatsAppButton phone={content.site.phone} />
    </>
  );
}
