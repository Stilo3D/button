export const apiPathBuilder = () => {
  const getRecordPath = (
    recordId: number | undefined
  ) => `/api/object-records/${recordId}/`;

  return { getRecordPath };
};
