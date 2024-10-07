import { AxiosError } from "axios";
import { useMsgDataStore } from "../../../store/store";
import { apiCall } from "../../../setups/axios/axiosInstance";
import { getRecordApiPath } from "../../../utils/getRecordApiPath";

export const useRecordData = () => {
  const recordId = useMsgDataStore(
    (state) => state.messageData?.object_record_meta.record_id
  );
  const addError = useMsgDataStore((state) => state.addStoreError);

  const getRecordFields = async () => {
    try {
      const response = await apiCall.get(getRecordApiPath(recordId));

      return response.data;
    } catch (error) {
      const errorData = error as AxiosError;
      addError({
        name: "Update Record Field Error",
        message: `${errorData.message}. Content: ${errorData.request?.response}`,
      });
    }
  };

  const updateRecordField = async (fieldAlias: string, value: string) => {
    try {
      const response = await apiCall.patch(getRecordApiPath(recordId), {
        [`${fieldAlias}`]: value,
      });

      return { data: response.data, status: response.status };
    } catch (error) {
      const errorData = error as AxiosError;
      addError({
        name: "Update Record Field Error",
        message: `${errorData.message}. Content: ${errorData.request?.response}`,
      });
    }
  };
  return { updateRecordField, getRecordFields };
};
