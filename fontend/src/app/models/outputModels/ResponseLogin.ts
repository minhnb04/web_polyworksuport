import { ResponseBase } from './ResponseBase';

export class ResponseLogin extends ResponseBase {
  Roles!: any;
  UserName!: string;
  FullName!: string;
  Email!: string;
  UniqueCode!: string;
  Classification!: string;
}

