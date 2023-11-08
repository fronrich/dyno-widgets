import type {
  HTMLInputAttributes,
  HTMLSelectAttributes,
  HTMLTextareaAttributes,
  HTMLInputTypeAttribute,
} from "svelte/elements";

import type { RangeSliderProps } from "svelte-range-slider-pips";

export type option = { value: unknown; key: string };

type CustomInputTypes =
  | "input"
  | "select"
  | "textarea"
  | "radiogroup"
  | "doublerangeslider"
  | "distanceslider";

type AllInputTypes = HTMLInputTypeAttribute | CustomInputTypes;

export type InputField = HTMLInputAttributes &
  HTMLTextareaAttributes &
  HTMLSelectAttributes &
  RangeSliderProps & {
    name: string;
    type: AllInputTypes;
    label?: string;
    options?: option[];
    value?: unknown;
    valueLow?: number;
    valueHigh?: number;
  };

export type Industry = "PLUMBING" | "ELECTRIC" | "HVAC" | "GENERIC";

export type ComponentName = string;

export type AccountType = "customer" | "merchant" | "hybrid";
export type CurrentUI = "customer" | "merchant";

export type User = Partial<{
  firstName: string;
  lastName: string;
  userName: string;
  title: string;
  business: string;
  superlative: string;
  profilePicture: string;
  accountType: AccountType;
  currentUI: CurrentUI;
}>;

export type DynoWidgetProps = Partial<{
  fields: InputField[];
  users: User[];
  industry: Industry;
  message: string;
  senderUuid: string;
  banner: string;
  rating: number;
  tags: string[];
  title: string;
  business: string;
  content: string;
  header: string;
}> &
  User;

type Widget = {
  index?: number;

  // once set this cannot be changed
  uuid?: string;

  // determines index
  // changes on modification
  timestampCreated?: string;
  timestampModified?: string;

  /**
   * context that helps the LLM understand what this Widget represents
   */
  description?: string;

  componentName: ComponentName;
  props: DynoWidgetProps;
};

export interface InputFormWidget extends Widget {
  props: {
    industry: Industry;
    fields: InputField[];
  };
}

export interface ChatWidget extends Widget {
  props: {
    message: string;
    senderUuid: string;
  };
}

// interface RatingWidget extends Widget {

// }

export interface BusinessCardWidget extends Widget {
  props: {
    banner: string;
    rating: number;
    tags: string[];
    title: string;
    content: string;
  };
}

export interface VendorCardWidget extends Widget {
  props: {
    banner: string;
    rating: number;
    firstName: string;
    lastName: string;
    userName: string;
  };
}

export interface VendorListWidget extends Widget {
  props: {
    users: User[];
  };
}

export type UnknownWidget =
  | InputFormWidget
  | ChatWidget
  | BusinessCardWidget
  | VendorCardWidget
  | VendorListWidget;

/**
 * @name incoming - incoming request yet to be approved
 * @name accepted - request that was accepted
 * @name updated - accepted request with updated information
 * @name completed - fulfilled request
 * @name rejected - request that was denied by the merchant, usually deleted shortly after rejection
 * @name canceled - request that was accepted but has been canceled by the merchant or customer
 */
export type RequestStatus =
  | "incoming"
  | "accepted"
  | "in-progress"
  | "updated"
  | "completed"
  | "rejected"
  | "canceled";
