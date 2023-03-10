export function isUrl(url = "") {
  const expression = new RegExp(
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  );
  const isImageExpression = new RegExp(/[\w-]+\.(jpg|png|txt)/g);
  if (url.match(expression) && url.match(isImageExpression)) {
    return true;
  } else {
    return false;
  }
}
