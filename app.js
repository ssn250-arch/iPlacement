// Data demo syarikat
const companies = [
  {
    nama: "Synergy Tech Solutions",
    alamat: "Kota Kinabalu, Sabah",
    jenis: "Rangkaian & Infrastruktur",
    telefon: "088-123456",
    emel: "info@synergy.com",
    maps: "https://maps.google.com"
  },
  {
    nama: "Digital Frontier Sdn Bhd",
    alamat: "Sandakan, Sabah",
    jenis: "Keselamatan Siber",
    telefon: "089-654321",
    emel: "contact@digitalfrontier.com",
    maps: "https://maps.google.com"
  }
];

// Data dokumen
const documents = [
  { nama: "Borang Lawatan & Penilaian", url: "docs/lawatan.pdf" },
  { nama: "Borang Pemarkahan", url: "docs/markah.pdf" },
  { nama: "Contoh Buku Log", url: "docs/log.pdf" }
];

function startSearch() {
  document.getElementById("search-section").scrollIntoView({ behavior: "smooth" });
}

// Papar syarikat
function renderCompanies(list) {
  const container = document.getElementById("company-list");
  container.innerHTML = "";
  list.forEach(c => {
    const div = document.createElement("div");
    div.className = "company-card";
    div.innerHTML = `
      <h3>${c.nama}</h3>
      <p><b>Alamat:</b> ${c.alamat}</p>
      <p><b>Jenis:</b> ${c.jenis}</p>
      <p><b>Telefon:</b> ${c.telefon}</p>
      <p><b>Email:</b> ${c.emel}</p>
      <a href="${c.maps}" target="_blank">📍 Lokasi</a>
    `;
    container.appendChild(div);
  });
}

// Papar dokumen
function renderDocuments() {
  const list = document.getElementById("doc-list");
  documents.forEach(d => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${d.url}" target="_blank">${d.nama}</a>`;
    list.appendChild(li);
  });
}

// Filter carian
function filterCompanies() {
  const negeri = document.getElementById("filterNegeri").value.toLowerCase();
  const daerah = document.getElementById("filterDaerah").value.toLowerCase();
  const jenis = document.getElementById("filterJenis").value.toLowerCase();

  const filtered = companies.filter(c =>
    c.alamat.toLowerCase().includes(negeri) &&
    c.alamat.toLowerCase().includes(daerah) &&
    c.jenis.toLowerCase().includes(jenis)
  );

  renderCompanies(filtered);
}

// Auto load
window.onload = () => {
  renderCompanies(companies);
  renderDocuments();
};
