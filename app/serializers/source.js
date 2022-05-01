import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class sourceSerializer extends JSONAPISerializer {
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    let count = 1;
    let data = [];
    payload.results.forEach((source) => {
        let sourceData = {
            type: "source",
            id: count.toString(),
            attributes: {
                source: source.sources
            },
        };
        count++;
        data.push(sourceData);
    });
    payload["data"] = data;
    delete payload.results;
    return super.normalizeFindAllResponse(...arguments);
  }
}
