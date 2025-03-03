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

import { mapValues } from '../runtime';
/**
 * Request to register or log in a user using a Google JWT token and user information.
 * @export
 * @interface UserLoginRequest
 */
export interface UserLoginRequest {
    /**
     * Google JWT token provided after Google authentication
     * @type {string}
     * @memberof UserLoginRequest
     */
    token: string;
}

/**
 * Check if a given object implements the UserLoginRequest interface.
 */
export function instanceOfUserLoginRequest(value: object): value is UserLoginRequest {
    if (!('token' in value) || value['token'] === undefined) return false;
    return true;
}

export function UserLoginRequestFromJSON(json: any): UserLoginRequest {
    return UserLoginRequestFromJSONTyped(json, false);
}

export function UserLoginRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserLoginRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'token': json['token'],
    };
}

  export function UserLoginRequestToJSON(json: any): UserLoginRequest {
      return UserLoginRequestToJSONTyped(json, false);
  }

  export function UserLoginRequestToJSONTyped(value?: UserLoginRequest | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'token': value['token'],
    };
}

