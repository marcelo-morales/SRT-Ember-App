import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class userSerializer extends JSONAPISerializer {
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    let data = [];
    payload.users.forEach((user) => {
        let userData = {
            type: "user",
            id: user._ID,
            attributes: {
                username: user.username,
                role: user.role,
                attempts: user.failedLogin
            }
        };
        data.push(userData)
    });

    payload["data"] = data;
    delete payload.users;
    return super.normalizeFindAllResponse(...arguments);
  }

  normalizeCreateRecordResponse(store, primaryModelClass, payload, id, requestType) {
    let data = {
        type: primaryModelClass.modelName, 
        id:  payload.user._ID,
        attributes: {
            username: payload.user.username,
            role: payload.user.role,
            password: payload.user.password,
            attempts: 0
        }
    }
    payload["data"] = data;
    delete payload.user;
    return super.normalizeCreateRecordResponse(...arguments);
  }

  normalizeDeleteRecordResponse(store, primaryModelClass, payload, id, requestType) {
      let data = {
          type: primaryModelClass.modelName,
          id: payload.id,
      }
      payload["data"] = data;
      return super.normalizeDeleteRecordResponse(...arguments);
  }
}