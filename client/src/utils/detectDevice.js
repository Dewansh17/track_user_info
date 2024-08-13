export const detectDevice = () => {
    const userAgent = navigator.userAgent;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
    const isMicrosoft = /Edge|MSIE|Trident/.test(userAgent);
    
    return {
      isMobile,
      isChrome,
      isMicrosoft,
      userAgent
    };
  };
  