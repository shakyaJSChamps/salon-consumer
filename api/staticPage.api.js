import HTTP from "@/service/http";
import { methods } from "../constants/page";
import { __endpoint_staticPageUrl } from '@/constants/endpoints';

export const staticPageUrl = (endpoint) =>
    HTTP.Request(methods.GET, __endpoint_staticPageUrl+endpoint);