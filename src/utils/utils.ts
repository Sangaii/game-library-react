export const formatDict = (data: Array<any>) => {
 // 必须得赋一个初始值
 let res: any = {};
 data.forEach((item) => {
  //把id作为对象的键  把value作为对象的值值
  res[item.key] = item.value;
 });
 return res;
};
