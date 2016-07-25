const w = global.window || {
  location: {
    search: '',
    hash: ''
  }
};


function dashDelimitedToCamelCase(string){
  return string.replace(
    /-([a-z])/g,
    ({ 1: firstLetterAfterDash, }) => firstLetterAfterDash.toUpperCase()
  );
}

function decode(string){
  return decodeURIComponent(string.replace(/\+/g, ' '));
}

function deserializeQueryString(inputQuery, queryStringObj = {}){
  const search = /([^&=]+)=?([^&]*)/g;
  const query = inputQuery.substring(1);
  let matches = search.exec(query);
  while (matches) {
    const [fullKey, onlyKey, rawValue, ] = matches;
    const isOnlyKey = fullKey === onlyKey;
    const value = isOnlyKey ? true : decode(rawValue);
    const key = dashDelimitedToCamelCase(onlyKey);
    queryStringObj[key] = value;
    matches = search.exec(query);
  }
  return queryStringObj;
}

const hash = deserializeQueryString(w.location.hash);
export const queryString = deserializeQueryString(w.location.search, hash);

