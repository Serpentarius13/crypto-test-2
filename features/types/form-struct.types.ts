import { InputHTMLAttributes } from "nuxt/dist/app/compat/capi";

export interface IStructDirection {
  notify: string;
  min: number;
  max: number;
  currency: string;
  round: number;
  monitoringCode: string;
}

export interface IStructCurrency {
  id: number;
  currency: string;
  active: boolean;
}

export interface IStructInputDetails {
  header: string;
  placeholder: string;
  error: string;
  visible: false;
}

export interface IStructNetwork {
  id: number;
  network: string;
  active: boolean;
}

export interface IStructInput {
  type: InputHTMLAttributes["type"];
  name: string;
  regex: string;
  send: IStructInputDetails;
  receiver: IStructInputDetails;
}

export interface IStructInnerDirection {
  currency: IStructCurrency[];
  input: IStructInput[];
  network: IStructNetwork[];
  city: string[];
}

export interface IFormStruct {
  course: number;
  bonus: number;
  notify: string;

  from: IStructDirection;
  to: IStructDirection;
  structure: {
    from: IStructInnerDirection;
    to: IStructInnerDirection;
  };
}
