"use server";

export async function purchaseAction(prevState: any, formData: FormData) {
  const affiliate_id = formData.get("affiliate_id");
  const product = formData.get("product");
  const name = formData.get("name");
  const email = formData.get("email");

  if (product !== "T-Shirt" && product !== "Mug" && product !== "Hat") {
    return { error: "Select available product" };
  }
  if (!name || !email) {
    return { error: "You should filled the empty field" };
  }

  return {
    success: true,
    data: {
      affiliate_id: affiliate_id,
      product: product,
      name: name,
      email: email,
    },
  };
}
