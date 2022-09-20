const modal = document.querySelector('#modal');
const modalHeader = modal.querySelector('h2');
const modalContent = modal.querySelector('article');
const modalExit = modal.querySelector('i a');

const fields = [
    { tag: 'input', attributes: { type: 'text', name: 'title', placeholder: 'Title' } },
    { tag: 'input', attributes: { type: 'text', name: 'yearOfSong', placeholder: 'Year of Song' } },
    { tag: 'input', attributes: { type: 'text', name: 'artistName', placeholder: 'Artist' } },
    { tag: 'textarea', attributes: { name: 'favLine', placeholder: 'Favourite Line' } },
    { tag: 'input', attributes: { type: 'submit', value: 'Add Song' } }
]

async function loadModalFor(category, id) {
    modalContent.innerHTML = '';
    modal.style.display = 'block';
    if (id === 'new') {
        renderNewSongForm();
    } else {
        const data = await getItem(category, id);
        category === 'songs' ? renderSongModal(data) : renderArtistModal(data);
    }
}

function renderSongModal(song) {
    modalHeader.textContent = `${song.title} - ${song.yearOfSong}`;
    const artistLink = createItemLink(song.artist);
    const favLine = document.createElement('p');
    favLine.textContent = song.favLine;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete Song';
    deleteBtn.onclick = () => deleteSong(song.id);
    modalContent.appendChild(artistLink);
    modalContent.appendChild(favLine);
    modalContent.appendChild(deleteBtn);
    modalExit.href = `#song`;
}

function renderArtistModal(artist) {
    modalHeader.textContent = artist.name;
    const list = document.createElement('ul');
    const songLinks = artist.songs.map(createItemLink);
    songLinks.forEach(link => {
        const li = document.createElement('li');
        li.appendChild(link);
        list.appendChild(li);
    })
    modalContent.appendChild(list);
    modalExit.href = `#artists`;
}

function renderNewSongForm(){
    modalHeader.textContent = 'Add a Song';
    const form = document.createElement('form');
    fields.forEach(f => {
        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => field.setAttribute(a, v))
        form.appendChild(field);
    })
    form.onsubmit = postSong;
    modalContent.appendChild(form);
    modalExit.href = `#songs`;
}

function createItemLink(data){
    console.log(data);
    const link = document.createElement('a');
    link.href = `#${data.path.substring(1)}`;
    link.textContent = data.name || data.title;
    return link;
}
