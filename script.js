
const items = [
{ emoji:'🌸', title:'Cherry Blossom Path', cat:'nature', desc:'A serene walkway lined with cherry blossoms in full bloom.', tags:['Spring','Flowers','Peace'], height:240, class:'cat-nature' },
{ emoji:'🗼', title:'Tokyo Skyline', cat:'travel', desc:'The iconic skyline of Tokyo as seen from Shibuya crossing at dusk.', tags:['Japan','City','Night'], height:300, class:'cat-travel' },
{ emoji:'🍜', title:'Hyderabadi Biryani', cat:'food', desc:'Authentic Dum Biryani from Old City Hyderabad — layers of saffron and spice.', tags:['Food','Hyderabad','Spicy'], height:200, class:'cat-food' },
{ emoji:'🏙', title:'Hitech City Nights', cat:'urban', desc:'The glittering skyline of HITEC City, Hyderabad after sunset.', tags:['Urban','Hyderabad','Night'], height:260, class:'cat-urban' },
{ emoji:'🎨', title:'Abstract Geometry', cat:'art', desc:'A digital art piece exploring symmetry and colour theory.', tags:['Digital','Abstract','Design'], height:220, class:'cat-art' },
{ emoji:'🌊', title:'Bay of Bengal', cat:'nature', desc:'The vast horizon of the Bay of Bengal from a shore in Andhra Pradesh.', tags:['Ocean','Andhra','Waves'], height:280, class:'cat-nature' },
{ emoji:'🕌', title:'Charminar at Dawn', cat:'travel', desc:'Charminar, the iconic monument of Hyderabad, bathed in early morning light.', tags:['Heritage','Hyderabad','Architecture'], height:340, class:'cat-travel' },
{ emoji:'🥘', title:'Pesarattu Breakfast', cat:'food', desc:'Green moong dal crepes served with ginger chutney — an Andhra classic.', tags:['Andhra','Breakfast','Healthy'], height:200, class:'cat-food' },
{ emoji:'🏗', title:'Construction & Steel', cat:'urban', desc:'The geometry of infrastructure — a study in concrete and sky.', tags:['Architecture','Minimal','Geometry'], height:240, class:'cat-urban' },
{ emoji:'🖼', title:'Rangoli Patterns', cat:'art', desc:'Intricate rangoli crafted during Diwali — pure geometry in colour.', tags:['Festival','Diwali','Colour'], height:260, class:'cat-art' },
{ emoji:'🌿', title:'Paddy Fields, Godavari', cat:'nature', desc:'Endless green paddy fields stretching to the Godavari riverbank.', tags:['Andhra','Fields','Serene'], height:220, class:'cat-nature' },
{ emoji:'✈️', title:'Airport Departure', cat:'travel', desc:'The quiet anticipation of a departure gate — every trip a new chapter.', tags:['Travel','Airport','Journey'], height:200, class:'cat-travel' },
{ emoji:'🍛', title:'Gongura Mutton', cat:'food', desc:'Tangy sorrel-leaf mutton curry — a signature taste of Rayalaseema.', tags:['Andhra','Mutton','Spicy'], height:240, class:'cat-food' },
{ emoji:'🌃', title:'Banjara Hills Dusk', cat:'urban', desc:'The upscale neighbourhood of Banjara Hills as evening lights flicker on.', tags:['Hyderabad','Dusk','Uptown'], height:300, class:'cat-urban' },
{ emoji:'🎭', title:'Mask & Shadow', cat:'art', desc:'A theatre mask study in dramatic lighting — performance and identity.', tags:['Theatre','Shadow','Drama'], height:220, class:'cat-art' },
{ emoji:'🌻', title:'Sunflower Field', cat:'nature', desc:'A sea of sunflowers following the afternoon sun in Telangana.', tags:['Flowers','Summer','Gold'], height:260, class:'cat-nature' },
{ emoji:'🏖', title:'Araku Valley', cat:'travel', desc:'The lush green valley of Araku — a hidden gem of Andhra Pradesh.', tags:['Valley','Nature','AP'], height:300, class:'cat-travel' },
{ emoji:'🧇', title:'Mirchi Bajji Street Food', cat:'food', desc:'Hot, crispy chilli bajjis from a Hyderabad street corner — iconic evening snack.', tags:['Street Food','Spicy','Evening'], height:200, class:'cat-food' },
{ emoji:'🌉', title:'Hussain Sagar', cat:'urban', desc:'The famous lake of Hyderabad with the Buddha statue rising from its centre.', tags:['Lake','Hyderabad','Buddha'], height:280, class:'cat-urban' },
{ emoji:'🖌', title:'Kalamkari Art', cat:'art', desc:'Traditional Kalamkari painting — natural dyes on cotton telling mythological tales.', tags:['Craft','Heritage','India'], height:240, class:'cat-art' },
];

let filtered = [...items];
let currentIndex = 0;

const grid = document.getElementById('galleryGrid');
const emptyState = document.getElementById('emptyState');
const lightbox = document.getElementById('lightbox');

function heightStyle(h) { return `height:${h}px;`; }

function render(list) {
grid.innerHTML = '';
if (list.length === 0) { emptyState.style.display = 'block'; return; }
emptyState.style.display = 'none';
list.forEach((item, idx) => {
    const el = document.createElement('div');
    el.className = 'gallery-item';
    el.innerHTML = `
    <div class="img-wrap ${item.class}" style="${heightStyle(item.height)}">${item.emoji}</div>
    <div class="gallery-overlay">
        <h4>${item.title}</h4>
        <span>${item.cat.charAt(0).toUpperCase()+item.cat.slice(1)}</span>
    </div>`;
    el.addEventListener('click', () => openLightbox(idx, list));
    grid.appendChild(el);
});
}

function openLightbox(idx, list) {
currentIndex = idx;
filtered = list;
updateLightbox();
lightbox.classList.add('open');
}

function updateLightbox() {
const item = filtered[currentIndex];
document.getElementById('lbImg').className = `lb-img ${item.class}`;
document.getElementById('lbImg').textContent = item.emoji;
document.getElementById('lbTitle').textContent = item.title;
document.getElementById('lbDesc').textContent = item.desc;
document.getElementById('lbMeta').innerHTML = item.tags.map(t => `<span class="lb-tag">${t}</span>`).join('');
}

document.getElementById('lbClose').onclick = () => lightbox.classList.remove('open');
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });
document.getElementById('lbPrev').onclick = (e) => { e.stopPropagation(); currentIndex = (currentIndex - 1 + filtered.length) % filtered.length; updateLightbox(); };
document.getElementById('lbNext').onclick = (e) => { e.stopPropagation(); currentIndex = (currentIndex + 1) % filtered.length; updateLightbox(); };

document.addEventListener('keydown', e => {
if (!lightbox.classList.contains('open')) return;
if (e.key === 'Escape') lightbox.classList.remove('open');
if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + filtered.length) % filtered.length; updateLightbox(); }
if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % filtered.length; updateLightbox(); }
});

// Filters
let activeFilter = 'all';
document.querySelectorAll('.filter-btn').forEach(btn => {
btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilters();
});
});

// Search
document.getElementById('searchInput').addEventListener('input', applyFilters);

function applyFilters() {
const q = document.getElementById('searchInput').value.toLowerCase();
let list = activeFilter === 'all' ? items : items.filter(i => i.cat === activeFilter);
if (q) list = list.filter(i => i.title.toLowerCase().includes(q) || i.cat.includes(q));
filtered = list;
render(list);
}

render(items);
document.getElementById('totalCount').textContent = items.length;
