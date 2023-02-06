// 貸出日数を計算
export const getNumberOfDays = (startDate: any, endDate: any) => {
  return ( endDate - startDate ) / ( 1000 * 60 * 60 * 24 ) + 1;
};