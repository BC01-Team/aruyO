// 日付を文字列に変換
export const getStringFromDate = (date: Date) => {
  let format_str = 'YYYY/MM/DD';

  format_str = format_str.replace(/YYYY/g, date.getFullYear().toString());
  format_str = format_str.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2)); //月だけ+1すること
  format_str = format_str.replace(/DD/g, ("0" + date.getDate()).slice(-2));

  return format_str;
};