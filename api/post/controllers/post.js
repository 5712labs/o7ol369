'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {

  async find(ctx) {
    let entities = await strapi.services.post.find(ctx.query);
    entities.map(entity => {
        // 값 변경
        // entity.title = '타이틀을 강제로 변경해보았습니다.';
        // 수정일자 필드 숨기기
        delete entity.updated_at;
        delete entity.created_at;
        delete entity.published_at;
    });
    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.post }));
  },
};