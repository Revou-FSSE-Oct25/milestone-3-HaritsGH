'use server';

import { getSession } from "@/lib/auth";
import ProductDetailPageElements from "./PageElements";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const session = await getSession();

  return(
    <ProductDetailPageElements 
      productId={id} 
      role={session !== null ? session.priviledge : ''}/>
  )
}