const detectDevice = (userAgent) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    const isChrome = /Chrome/.test(userAgent) && /Google Inc/.test(userAgent);
    const isMicrosoft = /Edge|MSIE|Trident/.test(userAgent);
    
    return {
      isMobile,
      isChrome,
      isMicrosoft,
      userAgent
    };
  };
  
  module.exports = { detectDevice };
  