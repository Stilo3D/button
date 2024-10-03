import { AxiosError } from "axios";
import { useMsgDataStore } from "../../../store/store";
import { apiPathBuilder } from "../../../constants/apiConsts";
import { useCustomAxios } from "../../../interceptors/config";

export const useRecordData = () => {
  const recordId = useMsgDataStore(
    (state) => state.messageData?.object_record_meta.record_id
  );
  const addError = useMsgDataStore((state) => state.addStoreError);
  const { getRecordPath } = apiPathBuilder();
  const { axios } = useCustomAxios();

  const getRecordFields = async () => {
    try {
      const response = await axios.get(getRecordPath(recordId));

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

  const updateRecordField = async (fieldAlias: string, value: string) => {
    try {
      const response = await axios.patch(getRecordPath(recordId), {
        [`${fieldAlias}`]: value,
      });

      return { data: response.data, status: response.status };
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

  // const addFieldToObj = async () => {
  //   try {
  //     const response = await axios.post(
  //       `/api/object-classes/${objClassId}/fields/`,

  //       {
  //         alias: `${Math.random()}l${Math.random()}`.replace(/\./g, "_"),
  //         type: "string",
  //         max_length: 114,
  //         label: `lab${Math.random()}`.replace(/\./g, "_"),
  //         is_identifier: false,
  //         order: 3,
  //       }
  //     );
  //     console.log("added field to obj response", response);

  //     return { data: response.data, status: response.status };
  //   } catch (error) {
  //     const errorData = error as AxiosError;
  //     addError({
  //       name: "Update Record Field Error",
  //       message:
  //         errorData.message + ". Content: " + errorData.request?.response,
  //     });
  //     throw error;
  //   }
  // };
  return { updateRecordField, getRecordFields };
};
