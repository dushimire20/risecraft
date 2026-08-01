import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import ProductDetailBody from "@/components/bodies/ProductDetailBody";

function findProduct(products, slug) {
  return products.find((p) => (p.slug || p.id) === slug);
}

export async function generateStaticParams() {
  const { products } = await getContent();
  return products.map((p) => ({ slug: p.slug || p.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { products } = await getContent();
  const product = findProduct(products, slug);
  return { title: product ? `${product.title} — FC Risecraft` : "Product — FC Risecraft" };
}

export default async function ProductGalleryPage({ params }) {
  const { slug } = await params;
  const content = await getContent();
  const product = findProduct(content.products, slug);

  if (!product) notFound();

  return <ProductDetailBody initialContent={content} slug={slug} />;
}
