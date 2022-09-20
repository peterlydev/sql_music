async function getAll(category){
    try {
        const response = await fetch(`http://localhost:3000/${category}`);
        const data = await response.json()
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function getItem(category, id) {
    try {
        const response = await fetch(`http://localhost:3000/${category}/${id}`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }
}

async function postSong(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        
        const response = await fetch('http://localhost:3000/songs', options);
        const { id, err } = await response.json();
        if(err) { 
            throw Error(err) 
        } else {
            window.location.hash = `#songs/${id}`
        }
    } catch (err) {
        console.warn(err);
    }
}

async function deleteSong(id){
    try {
        const options = { method: 'DELETE' }
        await fetch(`http://localhost:3000/songs/${id}`, options);
        window.location.hash = `#songs`
    } catch (err) {
        console.warn(err);
    }
}
