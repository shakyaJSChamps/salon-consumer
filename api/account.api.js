import HTTP from '@/service/http';
import {methods} from '../constants/page'
import { __endpoint_doLogin} from '@/constants/endpoints'




export const doLogin = (payload) =>
  HTTP.Request(methods.POST, __endpoint_doLogin, payload);