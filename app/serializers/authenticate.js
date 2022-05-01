/*One or more of the following keys must be present: "data", "errors", "meta".*/

import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class authenticateSerializer extends JSONAPISerializer {
    normalizeQueryRecordResponse(store, primaryModelClass, payload, id, requestType) {
        let data = {
            id: 0,
            type: primaryModelClass.modelName,
            attributes: {
                token: payload.token,
                message: payload.message,
                role: payload.role
            }
        }
        store.push({data: data});
        
        payload["data"] = data;

        return super.normalizeQueryRecordResponse(...arguments);
    }
}