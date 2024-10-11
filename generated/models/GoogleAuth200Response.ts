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
import type { UserResponse } from './UserResponse';
import {
    UserResponseFromJSON,
    UserResponseFromJSONTyped,
    UserResponseToJSON,
    UserResponseToJSONTyped,
} from './UserResponse';

/**
 * 
 * @export
 * @interface GoogleAuth200Response
 */
export interface GoogleAuth200Response {
    /**
     * 
     * @type {UserResponse}
     * @memberof GoogleAuth200Response
     */
    user?: UserResponse;
}

/**
 * Check if a given object implements the GoogleAuth200Response interface.
 */
export function instanceOfGoogleAuth200Response(value: object): value is GoogleAuth200Response {
    return true;
}

export function GoogleAuth200ResponseFromJSON(json: any): GoogleAuth200Response {
    return GoogleAuth200ResponseFromJSONTyped(json, false);
}

export function GoogleAuth200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GoogleAuth200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'user': json['user'] == null ? undefined : UserResponseFromJSON(json['user']),
    };
}

  export function GoogleAuth200ResponseToJSON(json: any): GoogleAuth200Response {
      return GoogleAuth200ResponseToJSONTyped(json, false);
  }

  export function GoogleAuth200ResponseToJSONTyped(value?: GoogleAuth200Response | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'user': UserResponseToJSON(value['user']),
    };
}
