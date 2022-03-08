const getId = (query) => {
    const data = new URLSearchParams(window.location.search);
    const id = data.get(query);
    if (!id) window.location.replace("index.html");
    return id;     
}

export default getId;