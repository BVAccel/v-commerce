export const imgUrl = (src, options) => {
  const { size = false, scale = false, format = false, crop = false, srcset = false } = options;
  const extIndex = src.lastIndexOf('.');
  const extension = format ? `.${format}` : src.slice(extIndex);
  let url = src.slice(0, extIndex);
  if (size) url += `_${size}`;
  if (scale) url += `@${scale}x`;
  url += extension;
  if (srcset) url += ` ${scale}x`;
  return url;
};