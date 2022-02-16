import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class sourcelistSerializer extends JSONAPISerializer {
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    let count = 1;
    let data = {
        id: count.toString(),
        type: primaryModelClass.modelName,
        relationships: {
            source: {
                data: []
            } 
        }};
    payload.results.forEach((source) => {
        let sourceData = {
            type: "source",
            id: count.toString(),
            attributes: {
                source: source.sources
            }
        };
        data.relationships.source.data.push(sourceData);
        count++;
    });
    payload["data"] = data;
    delete payload.results;
    return super.normalizeFindAllResponse(...arguments);
  }
}
