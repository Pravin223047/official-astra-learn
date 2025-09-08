/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as codeExecutions from "../codeExecutions.js";
import type * as comments from "../comments.js";
import type * as http from "../http.js";
import type * as interviews from "../interviews.js";
import type * as langchain_db from "../langchain/db.js";
import type * as lemonSqueezy from "../lemonSqueezy.js";
import type * as members from "../members.js";
import type * as myActions from "../myActions.js";
import type * as pdfStorage from "../pdfStorage.js";
import type * as snippets from "../snippets.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  codeExecutions: typeof codeExecutions;
  comments: typeof comments;
  http: typeof http;
  interviews: typeof interviews;
  "langchain/db": typeof langchain_db;
  lemonSqueezy: typeof lemonSqueezy;
  members: typeof members;
  myActions: typeof myActions;
  pdfStorage: typeof pdfStorage;
  snippets: typeof snippets;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
