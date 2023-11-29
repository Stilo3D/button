export enum StatusText {
  OK = "OK",
  Created = "Created",
}

export enum Status {
  OK = 200,
  NotFound = 404,
  ServerCode = 500,
  BadRequest = 400,
}

export enum ApiEndpoint {
  Login = "/api/users/login/",
  Users = "/api/users/",
  UserProfile = "/api/users/me/",
  Tasks = "/api/tasks/",
  Record = "/api/object-records/",
}

export enum DataToShow {
  Name = "Field Name",
  Value = "Field Value",
  NameAndValue = "Field Name & Field Value",
}

export enum Errors {
  Error = "error",
  ErrorMessage = "Failed to fetch Data.",
  NotFound = "The record was not found, check you have the correct value in the params and try again.",
  Server = "There was a server side issue. Please refresh and try again.",
  BadRequest = "Failed to update the field check field type & try again.",
}

export enum ParamEnums {
  YES = "Yes",
  NO = "NO",
}

export enum NumberOfCards {
  One = 1,
  Two,
  Three,
  Four,
}

export enum Layout {
  Horizontal = "Horizontal",
  Vertical = "Vertical",
}
