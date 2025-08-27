// Data Syarikat
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

// Data Dokumen
const documents = [
  { nama: "Borang Lawatan & Penilaian", url: "docs/lawatan.pdf" },
  { nama: "Borang Pemarkahan", url: "docs/markah.pdf" },
  { nama: "Contoh Buku Log", url: "docs/log.pdf" }
];

// Scroll ke carian
function scrollToSearch() {
  document.getElementById("search-section").scrollIntoView({ behavior: "smooth" });
}

// Papar senarai syarikat
function renderCompanies(list) {
  const container = document.getElementById("companyList");
  container.innerHTML = "";
  list.forEach(c => {
    container.innerHTML += `
      <div class="company-card">
        <h3>${c.nama}</h3>
        <p><b>Alamat:</b> ${c.alamat}</p>
        <p><b>Jenis:</b> ${c.jenis}</p>
        <p><b>Telefon:</b> ${c.telefon}</p>
        <p><b>Email:</b> ${c.emel}</p>
        <a href="${c.maps}" target="_blank">📍 Lokasi</a>
      </div>
    `;
  });
}

// Filter syarikat
function filterCompanies() {
  const negeri = document.getElementById("filterNegeri").value.toLowerCase();
  const daerah = document.getElementById("filterDaerah").value.toLowerCase();
  const jenis = document.getElementById("filterJenis").value.toLowerCase();

  const result = companies.filter(c =>
    c.alamat.toLowerCase().includes(negeri) &&
    c.alamat.toLowerCase().includes(daerah) &&
    c.jenis.toLowerCase().includes(jenis)
  );

  renderCompanies(result);
}

// Papar dokumen
function renderDocuments() {
  const docList = document.getElementById("docList");
  documents.forEach(d => {
    docList.innerHTML += `<li><a href="${d.url}" target="_blank">${d.nama}</a></li>`;
  });
}

// On load
window.onload = () => {
  renderCompanies(companies);
  renderDocuments();
};
