import axios, { AxiosError } from "axios";
import { useMsgDataStore } from "../../../store/store";
import { apiEndpointBuilder } from "../../../constants/apiConsts";

export const useGetRecordData = () => {
  const recordId = useMsgDataStore(
    (state) => state.messageData?.object_record_meta.record_id
  );
  const addError = useMsgDataStore((state) => state.addStoreError);
  const accessToken = useMsgDataStore(
    (state) => state.messageData?.user_details.access_token
  );
  const baseUrl = useMsgDataStore((state) => state.messageData?.endpoint);
  const { getRecordFieldsPath } = apiEndpointBuilder();

  const getRecordFields = async () => {
    try {
      const response = await axios.get(getRecordFieldsPath(baseUrl, recordId), {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      const errorData = error as AxiosError;
      addError({
        name: "Update Record Field Error",
        message:
          errorData.message + ". Content: " + errorData.request?.response,
      });
      throw error;
    }
  };
  return { getRecordFields };
};
