export const debounce = (mainFunction: Function, delay: number) => {
 let timer: any;

 return function (...args: any) {
   clearTimeout(timer);

   timer = setTimeout(() => {
     mainFunction(...args);
   }, delay);
 };
};