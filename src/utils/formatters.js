export const format = (occ) => {
    if (!occ) return "";
    return occ
      .replace(/([a-z])([A-Z])/g, "$1 $2") 
      .replace(/([a-z])([a-z]+)/g, (_, first, rest) => first.toUpperCase() + rest); 
  };
  