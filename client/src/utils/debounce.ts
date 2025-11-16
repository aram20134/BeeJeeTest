function debounce(
  func: any,
  wait: number
): (...args: any[]) => void {
  let timeout: any = null;

  return function (...args: any[]) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export default debounce;