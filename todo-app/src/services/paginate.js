import _ from 'lodash';
export function paginate(totalData, currentPage, pageSize) {
  const indexStart = (currentPage - 1) * pageSize;
  return _(totalData)
    .slice(indexStart)
    .take(pageSize)
    .value();
}
