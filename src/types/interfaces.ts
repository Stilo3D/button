interface UserDetails {
  access_token: string;
  user_id: number;
}

interface ObjectRecordMeta {
  class_id: number;
  record_id: number;
}

export interface Parameters {
  parameter_name: string;
  parameter_description: string;
  parameter_type: string;
  parameter_limit?: string;
  parameter_options?: string;
}

// Parameters that will be passed into the app from the iframe from the config.json file.
interface ComponentParameters {}

export interface MessageData {
  user_details: UserDetails;
  endpoint: string;
  object_record_meta: ObjectRecordMeta;
  component_parameters: ComponentParameters;
}

export interface ElementContext {
  messageData: MessageData | undefined;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export interface ErrorProps {
  message: string;
}
