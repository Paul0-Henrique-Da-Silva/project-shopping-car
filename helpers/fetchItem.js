const fetchItem = async (search) => {
    try {
    const url = `https://api.mercadolibre.com/items/${search}`;
    const response = await fetch(url);
    const responseObj = await response.json();
    return responseObj;
  } catch (e) {
    return Error('You must provide an url');
  } 
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  }; 
}
