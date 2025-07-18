import HomeCarousel from "@/components/Screens/home/HomeCarousel";
import { HomeSuggestions } from "@/components/Screens/home/HomeSuggestions";
import { DeliveryLocation } from "@/components/Shared/DeliveryLocation";
import { setSession } from "@/store/authSlice";
import { RootState } from "@/store/store";
import { supabase } from "@/supabase";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.auth.session);

  const hendleSignout = async () => {
    dispatch(setSession(null));
    await supabase.auth.signOut();
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <DeliveryLocation />
      <HomeCarousel />
      <HomeSuggestions />
    </ScrollView>
  );
}
