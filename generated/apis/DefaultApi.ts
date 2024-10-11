/* tslint:disable */
/* eslint-disable */
/**
 * Google Login API
 * API to handle user registration and login using Google authentication
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  GetUsers200Response,
  GoogleAuth401Response,
  SignInRequest,
} from '../models/index';
import {
    GetUsers200ResponseFromJSON,
    GetUsers200ResponseToJSON,
    GoogleAuth401ResponseFromJSON,
    GoogleAuth401ResponseToJSON,
    SignInRequestFromJSON,
    SignInRequestToJSON,
} from '../models/index';

export interface GoogleAuthRequest {
    signInRequest: SignInRequest;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     * Retrieve a paginated list of users using limit and offset for pagination.
     * Get Users
     */
    async getUsersRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetUsers200Response>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("BearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/users`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetUsers200ResponseFromJSON(jsonValue));
    }

    /**
     * Retrieve a paginated list of users using limit and offset for pagination.
     * Get Users
     */
    async getUsers(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetUsers200Response> {
        const response = await this.getUsersRaw(initOverrides);
        return await response.value();
    }

    /**
     * Validates a Google JWT token sent from the frontend, retrieves user information, and  registers a new user or logs in an existing user based on token data. 
     * Register or login a user with Google JWT token
     */
    async googleAuthRaw(requestParameters: GoogleAuthRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['signInRequest'] == null) {
            throw new runtime.RequiredError(
                'signInRequest',
                'Required parameter "signInRequest" was null or undefined when calling googleAuth().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/auth/google`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SignInRequestToJSON(requestParameters['signInRequest']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Validates a Google JWT token sent from the frontend, retrieves user information, and  registers a new user or logs in an existing user based on token data. 
     * Register or login a user with Google JWT token
     */
    async googleAuth(requestParameters: GoogleAuthRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.googleAuthRaw(requestParameters, initOverrides);
    }

}