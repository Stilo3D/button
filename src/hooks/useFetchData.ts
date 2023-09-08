import { useContext, useEffect } from "react";
import { ElementConfigContext } from "../context/context";

export const useFetchData = () => {
  const { setLoading, loading, messageData } = useContext(ElementConfigContext);

  // Do some actions such as refetch data when the messageData get updated.
  useEffect(() => {
    if (messageData?.user_details.access_token) {
      (async () => {
        // You can use api's to fetch data from here.
      })();
    }

    console.log(
      "🚀 ~ file: useFetchData.ts:13 ~ useFetchData ~ messageData:",
      messageData
    );
  }, [messageData]);

  // Simulate fetching data from catalyst system
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [setLoading]);

  return { loading };
};
