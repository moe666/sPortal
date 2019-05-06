import _ from "lodash";

//iteration through errors with forEach where "val" is the errors object and "key" is the field
export default function(errors) {
  const result = {};
  _.forEach(errors, (val, key) => {
    result[key] = val.message;
  });
  return result;
}
