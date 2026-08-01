import { getContent } from "@/lib/content";
import ProductsBody from "@/components/bodies/ProductsBody";

export const metadata = { title: "Products — FC Risecraft" };

export default async function ProductsPage() {
  const content = await getContent();
  return <ProductsBody initialContent={content} />;
}
