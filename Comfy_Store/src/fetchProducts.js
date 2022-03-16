const fetchProducts = async (url) => {
    
         const response = await fetch(url).catch(err => console.log(err));
         if (response){
             if (response.status >= 200  && response.status <= 299)
             return response.json();
             else return `Error fetching data: "${response.status}"`;
         }
         else 
         return `Fetching failed...`;
};

export default fetchProducts;
