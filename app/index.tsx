import { setUndeliverdCount } from "@/store/orderCountSlice";
import { RootState } from "@/store/store";
import { getUndeliverdCount } from "@/utils/getUndeliverdCount";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const session = useSelector((state: RootState) => state.auth.session);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCount = async () => {
      if (session?.user?.id) {
        const count = await getUndeliverdCount(session?.user.id);
        if (count !== null) {
          dispatch(setUndeliverdCount(count));
        }
      }
    };

    fetchCount();
  }, [session?.user.id]);
  return <Redirect href="/(tabs)" />;
}
