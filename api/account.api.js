import HTTP from '@/service/http';
import { methods } from '../constants/page'
import { __endpoint_doLogin, __endpoint_verifyUser, __endpoint_getSaloonList, __endpoint_getDoorBuddyList, __endpoint_verify } from '@/constants/endpoints'




export const doLogin = (payload) =>
  HTTP.Request(methods.POST, __endpoint_doLogin, payload);
export const verifyUser = (payload) =>
  HTTP.Request(methods.POST, __endpoint_verify, payload);
export const getSalonLists = () =>
  HTTP.Request(methods.GET, __endpoint_getSaloonList);
export const getDoorBuddyLists = (payload) =>
  HTTP.Request(methods.GET, __endpoint_getDoorBuddyList, payload);
