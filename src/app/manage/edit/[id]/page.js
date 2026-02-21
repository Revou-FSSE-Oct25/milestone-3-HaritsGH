'use server';

import EditProductPageElements from "./pageElements";

export default async function EditProductPage({ params }) {
  const { id } = await params;

  return(
    <EditProductPageElements 
      productId={id} 
    />
  )
}
