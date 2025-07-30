import { supabase } from "@/supabase";

export const getUndeliverdCount = async (
  sellerId: string | undefined
): Promise<number | null> => {
  let query = supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("seller_id", sellerId)
    .eq("is_delivered", false);

  const { count, error } = await query;

  if (error) {
    console.error("Failed to fetch order count:", error);
    return null;
  }

  return count ?? 0;
};
