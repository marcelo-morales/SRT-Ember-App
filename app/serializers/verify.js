import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class verifySerializer extends JSONAPISerializer {
    normalizeCreateRecordResponse(store, primaryModelClass, payload, id, requestType) {
        let data = {
            id: 0,
            type: primaryModelClass.modelName,
            attributes: {
                message: payload.message,
                role: payload.role
            }
        }
        store.push({data: data});
        
        payload["data"] = data;

        return super.normalizeQueryRecordResponse(...arguments);
    }
}