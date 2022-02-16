import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class sourcelistSerializer extends JSONAPISerializer {
  normalizeFindAllResponse(store, primaryModelClass, payload, id, requestType) {
    let count = 1;
    let data = {
        id: count.toString(),
        type: primaryModelClass.modelName,
        relationships: {
            sources: {
                data: []
            } 
        }};
    payload.results.forEach((source) => {
        let sourceData = {
            type: "source",
            id: count.toString(),
            attributes: {
                source: source.sources
            },
            relationships: {
                sourcelist: {
                    data: {
                        type: primaryModelClass.modelName,
                        id: "1"
                    }
                }
            }
        };
        store.push({data: sourceData});
        data.relationships.sources.data.push({
            type: sourceData.type, 
            id: sourceData.id
        });
        count++;
    });
    payload["data"] = data;
    delete payload.results;
    return super.normalizeFindAllResponse(...arguments);
  }
}
