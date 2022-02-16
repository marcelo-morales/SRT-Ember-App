import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class querySerializer extends JSONAPISerializer {
    serialize(snapshot, options) {
        let json = super.serialize(...arguments);
        json["command"] = json.data.attributes.command;
        json["email"] = json.data.attributes.email;
        
        delete json.data;

        return json;
    }
    
    normalizeCreateRecordResponse(store, primaryModelClass, payload, id, requestType) {
        let data = {
            id: id,
            type: primaryModelClass.modelName,
            attributes: {
                command: payload.data.command,
                email: payload.data.email,
            } 
        }
        payload["data"] = data;
        return super.normalizeCreateRecordResponse(...arguments);
    }
}