exports.formatComments = (comments, idLookup) => {
    return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
      const article_id = idLookup[belongs_to];
      return {
        article_id,
        author: created_by,
        ...this.convertTimestampToDate(restOfComment),
      };
    });
  };
  