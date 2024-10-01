import axios from "axios";
import { useMsgDataStore } from "../store/store";

export const useUpdateRecordData = () => {
  const recordId = useMsgDataStore(
    (state) => state.messageData?.object_record_meta.record_id
  );
  const accessToken = useMsgDataStore(
    (state) => state.messageData?.user_details.access_token
  );
  const baseUrl = useMsgDataStore((state) => state.messageData?.endpoint);

  const updateRecordField = async (fieldAlias: string, value: string) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/api/object-records/${recordId}/`,
        {
          [`${fieldAlias}`]: value,
        },
        {
          headers: {
            Authorization: `JWT ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return { updateRecordField };
};
