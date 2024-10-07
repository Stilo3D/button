export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface LoginParameters {
  data: {
    username: string;
    password: string;
  };
}

interface UserDetails {
  access_token: string;
  first_name: string;
  last_name: string;
  user_id: number;
  user_name: string;
}

interface ObjectRecordMeta {
  class_id: number | undefined;
  record_id: number | undefined;
}

export interface Parameters {
  parameter_name: string;
  parameter_description: string;
  parameter_type: string;
  parameter_limit?: string;
  parameter_options?: string;
  parameter_value?: string | number | undefined;
}

/**
 * Parameters that will be passed into the app from the iframe from the config.json file.
 */
export interface ParameterData {
  field: string;
  value: string;
  label?: string;
  width?: string;
  height?: string;
  color?: string;
  latching?: boolean;
  polling_time?: number;
  message_style?: "left" | "top" | "bottom";
  message_processing?: string;
  message_enabled?: string;
  message_disabled?: string;
}

export interface MessageData {
  user_details: UserDetails;
  endpoint: string;
  object_record_meta: ObjectRecordMeta;
  component_parameters: Parameters[];
  parameters: ParameterData;
}
