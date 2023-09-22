"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchPublic = exports.FetchPrivate = void 0;
/** Attempts to fetch data from the specified url with the Authorization header
 *
 * @param method string to specify the HTTP method ('GET','POST','PUT', etc.)
 * @param endPoint string to specify the endpoint of the api (api/example/route)
 * @param body object with the parameters to be sent to the specified url
 * @returns {HttpResponse}
 */
const FetchPrivate = (method, endPoint, token, body) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + (token));
    let requestOptions;
    if (body != null && body != undefined) {
        requestOptions = {
            method: method,
            mode: "cors",
            body: JSON.stringify(body),
            headers: headers,
            redirect: "follow",
        };
    }
    else {
        requestOptions = {
            method: method,
            mode: "cors",
            headers: headers,
            redirect: "follow",
        };
    }
    const url = import.meta.env.VITE_API_URL + endPoint;
    return yield fetch(url, requestOptions)
        .then((response) => {
        return Promise.all([response.ok, response.json().catch(() => null)]);
    })
        .then(([ok, body]) => {
        return { ok, body };
    });
});
exports.FetchPrivate = FetchPrivate;
/** Attempts to fetch data from the specified url without the Authorization header
 *
 * @param method string to specify the HTTP method ('GET','POST','PUT', etc.)
 * @param endPoint string to specify the endpoint of the api (api/example/route)
 * @param body object with the parameters to be sent to the specified url
 * @returns {HttpResponse}
 */
const FetchPublic = (method, endPoint, body) => __awaiter(void 0, void 0, void 0, function* () {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    let requestOptions;
    if (body != null && body != undefined) {
        requestOptions = {
            method: method,
            mode: "cors",
            body: JSON.stringify(body),
            headers: headers,
            redirect: "follow",
        };
    }
    else {
        requestOptions = {
            method: method,
            mode: "cors",
            headers: headers,
            redirect: "follow",
        };
    }
    const url = import.meta.env.VITE_API_URL + endPoint;
    return yield fetch(url, requestOptions)
        .then((response) => {
        return Promise.all([response.ok, response.json().catch(() => null)]);
    })
        .then(([ok, body]) => {
        return { ok, body };
    });
});
exports.FetchPublic = FetchPublic;
