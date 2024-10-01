export const apiEndpointBuilder = () => {
  const getRecordFieldsPath = (
    baseUrl: string | undefined,
    recordId: number | undefined
  ) => `${baseUrl}/api/object-records/${recordId}/`;

  return { getRecordFieldsPath };
};
