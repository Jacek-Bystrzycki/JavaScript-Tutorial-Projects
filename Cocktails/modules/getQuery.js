const getId = (query) => {
    const data = new URLSearchParams(window.location.search);
    const id = data.get(query);
    return id;     
}

export default getId;