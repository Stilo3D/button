//import { DataToShow } from "./enums";
import { ComponentParameters } from "./types";

export interface LoginRs {
  access: string;
  refresh: string;
}

export interface LoginArgs {
  data: {
    username: string;
    password: string;
  };
  baseUrl: string;
}

export interface UserInfo {
  id: number;
  username: string;
  account_type: string;
  first_name: string;
  last_name: string;
  job_title: string;
  company_name: string;
  phone: string;
  mobile: string;
  status: string;
  roles: number[];
}

export interface UserCredentials {
  username: string;
  password: string;
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

// Parameters that will be passed into the app from the iframe from the config.json file.
export interface ParameterData {
  field: string;
  value: string;
  label?: string;
  width?: string;
  height?: string;
  colour?: string;
  latching?: boolean;
  polling_time?: number;
  message_processing?: string;
  message_enabled ?: string;
  message_disabled?: string;
}

export interface MessageData {
  user_details: UserDetails;
  endpoint: string;
  object_record_meta: ObjectRecordMeta;
  component_parameters: ComponentParameters;
  parameters: ParameterData;
}

export interface ElementContext {
  messageData: MessageData | undefined;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string | undefined;
}

export interface ErrorProps {
  message: string;
}

export interface Record {
  [prop: string]: string | number;
}

export interface ApiData {
  limit: number;
  offset: number;
  filtered_count: number;
  total_count: number;
  next: null | string;
  previous: null | string;
  results: Record[];
}

export interface InfiniteScrollData {
  dataLength: number;
  hasMore: boolean;
  next: null | string;
}

export interface SelectedRecord {
  id: number;
  fields?: string;
  value?: string;
}

export interface List {
  fieldAlias: string;
  value: string | number;
  fieldName: string;
}

interface ApiResults {
  id: number;
  object_name: string;
  object_class: number;
  created_at: string;
  created_by: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    company_name: string;
    is_deleted: boolean;
    account_type: string;
  };
  modified_at: string;
  modified_by: {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    company_name: string;
    is_deleted: boolean;
    account_type: string;
  };
  _meta: {
    permissions: {
      list: boolean;
      view: boolean;
      edit: boolean;
      create: boolean;
      delete: boolean;
      edit_owners: boolean;
      view_owners: boolean;
      tasks: {
        list: boolean;
        view: boolean;
        edit: boolean;
        delete: boolean;
        create: boolean;
        complete: boolean;
        assign: boolean;
      };
    };
    labels: {
      object_class: string;
    };
    users: null | string;
  };
  [prop: string]: any;
}

export interface ObjectRecordApi {
  limit: number;
  offset: number;
  filtered_count: number;
  total_count: number;
  next: null | string;
  previous: null | string;
  results: ApiResults[];
}
