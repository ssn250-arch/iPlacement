import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Phone, Mail, Briefcase, Plus, ChevronLeft, ChevronRight, XCircle, LayoutGrid, List, User, LogOut, Edit, Trash, Search, FileText, Book, Upload } from 'lucide-react';

// Data statik untuk dropdown
const negeri = [
  'Semua',
  'Sabah',
  'Sarawak',
  'Perak',
  'Pahang',
  'Selangor',
  'Kuala Lumpur',
  'Johor',
  'Negeri Sembilan',
  'Melaka',
  'Pulau Pinang',
  'Kedah',
  'Perlis',
  'Terengganu',
  'Kelantan'
];

// Senarai daerah yang dipermudah untuk setiap negeri
const daerah = {
  'Sabah': [
    'Semua',
    'Kota Kinabalu',
    'Sandakan',
    'Tawau',
    'Lahad Datu',
    'Keningau',
    'Semporna',
    'Papar',
    'Ranau',
    'Kudat',
    'Tuaran',
    'Tambunan',
    'Beluran',
    'Telupid',
    'Penampang'
  ],
  'Sarawak': ['Semua', 'Kuching', 'Sibu', 'Miri', 'Bintulu'],
  'Perak': ['Semua', 'Ipoh', 'Taiping', 'Manjung'],
  'Pahang': ['Semua', 'Kuantan', 'Temerloh', 'Raub'],
  'Selangor': ['Semua', 'Petaling Jaya', 'Shah Alam', 'Subang Jaya'],
  'Kuala Lumpur': ['Semua', 'Kuala Lumpur'],
  'Johor': ['Semua', 'Johor Bahru', 'Batu Pahat', 'Muar'],
  'Negeri Sembilan': ['Semua', 'Seremban', 'Port Dickson'],
  'Melaka': ['Semua', 'Melaka Tengah', 'Alor Gajah'],
  'Pulau Pinang': ['Semua', 'Georgetown', 'Seberang Perai'],
  'Kedah': ['Semua', 'Alor Setar', 'Sungai petani'],
  'Perlis': ['Semua', 'Kangar'],
  'Terengganu': ['Semua', 'Kuala Terengganu', 'Dungun'],
  'Kelantan': ['Semua', 'Kota Bharu', 'Pasir Mas'],
  'Semua': ['Semua']
};

const jenisPerusahaan = [
  'Semua',
  'Teknologi Maklumat',
  'Telekomunikasi',
  'Rangkaian & Infrastruktur',
  'Keselamatan Siber',
  'Perisian & Aplikasi',
  'Sistem Embedded',
  'IoT & Automasi',
  'Pusat Data',
  'Perkhidmatan IT',
  'E-Commerce',
  'Lain-lain'
];

// Senarai syarikat tambahan untuk demonstrasi pagination
const initialCompanies = [
  { bil: 1, nama: 'Synergy Tech Solutions', alamat: 'Lot 23, Jalan Tuaran, Kota Kinabalu', negeri: 'Sabah', daerah: 'Kota Kinabalu', jenis: 'Rangkaian & Infrastruktur', tel: '088-1234567', emel: 'info@synergytech.my', lokasi: 'https://maps.app.goo.gl/abcdefg12345' },
  { bil: 2, nama: 'Digital Frontier Sdn Bhd', alamat: 'Jalan Labuk, Taman Indah Jaya, Sandakan', negeri: 'Sabah', daerah: 'Sandakan', jenis: 'Keselamatan Siber', tel: '089-7654321', emel: 'career@digitalfrontier.com', lokasi: 'https://maps.app.goo.gl/hijklmn67890' },
  { bil: 3, nama: 'Innovate Solutions', alamat: 'Taman Perindustrian Sandakan, Jalan Airport', negeri: 'Sabah', daerah: 'Sandakan', jenis: 'Perisian & Aplikasi', tel: '089-8765432', emel: '', lokasi: 'https://maps.app.goo.gl/opqrst01234' },
  { bil: 4, nama: 'Cyberlink Networks', alamat: 'Jalan Gaya, 88000 Kota Kinabalu', negeri: 'Sabah', daerah: 'Kota Kinabalu', jenis: 'Telekomunikasi', tel: '088-2345678', emel: 'hr@cyberlink.net', lokasi: 'https://maps.app.goo.gl/uvwxyza56789' },
  { bil: 5, nama: 'Smart Automation Lab', alamat: 'Lot 10, Jalan Sulaman, Kota Kinabalu', negeri: 'Sabah', daerah: 'Kota Kinabalu', jenis: 'IoT & Automasi', tel: '088-3456789', emel: 'contact@smartlab.com.my', lokasi: 'https://maps.app.goo.gl/bcdefgh01234' },
  { bil: 6, nama: 'Future Data Services', alamat: 'Jalan Airport, Tawau', negeri: 'Sabah', daerah: 'Tawau', jenis: 'Pusat Data', tel: '089-4567890', emel: 'info@futuredatats.com', lokasi: 'https://maps.app.goo.gl/ijklmno56789' },
  { bil: 7, nama: 'NextGen Infotech', alamat: 'Lot 77, Jalan Tun Razak, Keningau', negeri: 'Sabah', daerah: 'Keningau', jenis: 'Teknologi Maklumat', tel: '087-1234567', emel: 'info@nextgen.com', lokasi: 'https://maps.app.goo.gl/mnopqr012345' },
  { bil: 8, nama: 'Cloudy Solutions', alamat: 'Jalan Semporna, Semporna', negeri: 'Sabah', daerah: 'Semporna', jenis: 'Perkhidmatan IT', tel: '089-9876543', emel: 'support@cloudy.net', lokasi: 'https://maps.app.goo.gl/stuvwxy67890' },
  { bil: 9, nama: 'Global Cybersec', alamat: 'Jalan Pesisir, Papar', negeri: 'Sabah', daerah: 'Papar', jenis: 'Keselamatan Siber', tel: '088-3334444', emel: 'contact@globalcybersec.com', lokasi: 'https://maps.app.goo.gl/zabcd567890' },
  { bil: 10, nama: 'Rangkaian Dinamik', alamat: 'Jalan Peringkat, Ranau', negeri: 'Sabah', daerah: 'Ranau', jenis: 'Rangkaian & Infrastruktur', tel: '088-5556666', emel: 'sales@rangkaiandinamik.my', lokasi: 'https://maps.app.goo.gl/efghi012345' },
  { bil: 11, nama: 'Telekom Maju', alamat: 'Jalan Labuan, Tawau', negeri: 'Sabah', daerah: 'Tawau', jenis: 'Telekomunikasi', tel: '089-7778888', emel: 'enquiry@telekommaju.my', lokasi: 'https://maps.app.goo.gl/jklmn678901' },
  { bil: 12, nama: 'Perisian Cekap', alamat: 'Taman Perdana, Lahad Datu', negeri: 'Sabah', daerah: 'Lahad Datu', jenis: 'Perisian & Aplikasi', tel: '089-1112222', emel: 'contact@perisiancekap.com', lokasi: 'https://maps.app.goo.gl/opqrs23456' },
  { bil: 13, nama: 'IT Services Sabah', alamat: 'Lot 50, Jalan Sembulan, Kota Kinabalu', negeri: 'Sabah', daerah: 'Kota Kinabalu', jenis: 'Perkhidmatan IT', tel: '088-4445555', emel: 'support@itservicessabah.com', lokasi: 'https://maps.app.goo.gl/tuva5678901' },
  { bil: 14, nama: 'Sistem Embedded Solutions', alamat: 'Lot 65, Jalan Tuaran, Tuaran', negeri: 'Sabah', daerah: 'Tuaran', jenis: 'Sistem Embedded', tel: '088-6667777', emel: 'info@embedded.my', lokasi: 'https://maps.app.goo.gl/wxyz012345' }
];

// Komponen utama aplikasi pangkalan data
const MainApp = () => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [filters, setFilters] = useState({
    negeri: 'Semua',
    daerah: 'Semua',
    jenis: 'Semua'
  });
  const [filteredCompanies, setFilteredCompanies] = useState(initialCompanies);
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAddingCompany, setIsAddingCompany] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [editCompanyId, setEditCompanyId] = useState(null);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  const [newCompany, setNewCompany] = useState({
    bil: companies.length + 1,
    nama: '',
    alamat: '',
    negeri: '',
    daerah: '',
    jenis: '',
    tel: '',
    emel: '',
    lokasi: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 9;
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); 
  const [showDocs, setShowDocs] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [docs, setDocs] = useState([
    { id: 1, nama: 'Borang Lawatan Penyeliaan & Penilaian (BK-T11-03)', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 2, nama: 'Borang Pemarkahan LI (BK-T11-04)', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
    { id: 3, nama: 'Buku Log (Contoh)', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
  ]);
  const [isAddingDoc, setIsAddingDoc] = useState(false);
  const [isEditingDoc, setIsEditingDoc] = useState(false);
  const [editDocId, setEditDocId] = useState(null);
  const [newDoc, setNewDoc] = useState({
    id: docs.length + 1,
    nama: '',
    file: null,
    url: ''
  });
  const [docToDelete, setDocToDelete] = useState(null);


  useEffect(() => {
    const applyFilters = () => {
      let tempCompanies = companies;

      if (filters.negeri !== 'Semua') {
        tempCompanies = tempCompanies.filter(company => company.negeri === filters.negeri);
      }
      
      if (filters.daerah !== 'Semua') {
        tempCompanies = tempCompanies.filter(company => company.daerah === filters.daerah);
      }

      if (filters.jenis !== 'Semua') {
        tempCompanies = tempCompanies.filter(company => company.jenis === filters.jenis);
      }

      setFilteredCompanies(tempCompanies);
      setCurrentPage(1); 
    };

    applyFilters();
  }, [filters, companies]);

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleNewCompanyChange = (e) => {
    const { name, value } = e.target;
    setNewCompany(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCompany = (e) => {
    e.preventDefault();
    if (newCompany.nama && newCompany.negeri && newCompany.daerah && newCompany.jenis) {
      setCompanies(prev => [...prev, { ...newCompany, bil: prev.length + 1 }]);
      setIsAddingCompany(false);
      showMessage("Syarikat berjaya ditambah!");
      setNewCompany({
        bil: companies.length + 2,
        nama: '',
        alamat: '',
        negeri: '',
        daerah: '',
        jenis: '',
        tel: '',
        emel: '',
        lokasi: ''
      });
    } else {
      showMessage("Sila isi semua maklumat yang diperlukan (Nama, Negeri, Daerah, Jenis Perusahaan).");
    }
  };

  const handleUpdateCompany = (e) => {
    e.preventDefault();
    if (newCompany.nama && newCompany.negeri && newCompany.daerah && newCompany.jenis) {
        setCompanies(prev => prev.map(company => company.bil === editCompanyId ? { ...newCompany, bil: company.bil } : company));
        setIsEditingCompany(false);
        setEditCompanyId(null);
        showMessage("Maklumat syarikat berjaya dikemas kini!");
        setNewCompany({
            bil: companies.length + 1,
            nama: '',
            alamat: '',
            negeri: '',
            daerah: '',
            jenis: '',
            tel: '',
            emel: '',
            lokasi: ''
        });
    } else {
        showMessage("Sila isi semua maklumat yang diperlukan.");
    }
  };
  
  const handleDeleteCompany = (bil) => {
    setCompanyToDelete(bil);
  };

  const confirmDeleteCompany = () => {
    setCompanies(prev => prev.filter(company => company.bil !== companyToDelete));
    showMessage("Syarikat berjaya dipadam!");
    setCompanyToDelete(null); 
  };

  const cancelDeleteCompany = () => {
    setCompanyToDelete(null);
  };

  const handleEditClick = (company) => {
    setIsEditingCompany(true);
    setEditCompanyId(company.bil);
    setNewCompany({ ...company });
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin@12345') {
      setIsAdmin(true);
      setShowLogin(false);
      showMessage("Log masuk berjaya sebagai admin.");
    } else {
      showMessage("Nama pengguna atau kata laluan salah.");
    }
  };
  
  const handleLogout = () => {
    setIsAdmin(false);
    setIsAddingCompany(false);
    setIsEditingCompany(false);
    setEditCompanyId(null);
    showMessage("Log keluar berjaya.");
  };

  const showMessage = (message) => {
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75 z-50';
    messageBox.innerHTML = `
      <div class="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm">
        <p class="text-gray-800 text-lg mb-4">${message}</p>
        <button class="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">OK</button>
      </div>
    `;
    document.body.appendChild(messageBox);
    messageBox.querySelector('button').onclick = () => messageBox.remove();
  };

  // Fungsi-fungsi untuk dokumen
  const handleAddDoc = (e) => {
    e.preventDefault();
    if (newDoc.nama && newDoc.file) {
      const newDocId = docs.length > 0 ? Math.max(...docs.map(d => d.id)) + 1 : 1;
      const newUrl = URL.createObjectURL(newDoc.file); // Menggunakan URL objek untuk demo
      setDocs(prev => [...prev, { id: newDocId, nama: newDoc.nama, url: newUrl }]);
      setIsAddingDoc(false);
      setNewDoc({ id: newDocId + 1, nama: '', file: null, url: '' });
      showMessage("Dokumen berjaya ditambah!");
    } else {
      showMessage("Sila isi semua maklumat dokumen.");
    }
  };

  const handleUpdateDoc = (e) => {
    e.preventDefault();
    if (newDoc.nama) {
        setDocs(prev => prev.map(doc => doc.id === editDocId ? { ...newDoc, id: doc.id, url: newDoc.url || doc.url, file: newDoc.file || doc.file } : doc));
        setIsEditingDoc(false);
        setEditDocId(null);
        showMessage("Dokumen berjaya dikemas kini!");
        setNewDoc({ id: docs.length + 1, nama: '', file: null, url: '' });
    } else {
        showMessage("Sila isi semua maklumat dokumen.");
    }
  };
  
  const handleDeleteDoc = (id) => {
    setDocToDelete(id);
  };
  
  const confirmDeleteDoc = () => {
    setDocs(prev => prev.filter(doc => doc.id !== docToDelete));
    showMessage("Dokumen berjaya dipadam!");
    setDocToDelete(null);
  };

  const cancelDeleteDoc = () => {
    setDocToDelete(null);
  };

  const handleEditDocClick = (doc) => {
    setIsEditingDoc(true);
    setEditDocId(doc.id);
    setNewDoc({ id: doc.id, nama: doc.nama, file: null, url: doc.url });
  };


  return (
    <div className="font-sans antialiased bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="container w-full max-w-4xl p-4 sm:p-8">
        <div className="text-center mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 uppercase">
            PANGKALAN DATA SYARIKAT LI
          </h1>
        </div>
        <p className="text-center text-gray-600 mb-8 sm:mb-12">
          ADTEC JTM Kampus Sandakan
        </p>

        {/* Menu Pilihan */}
        <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-8">
          <button
            onClick={() => {
              setIsAddingCompany(false);
              setIsEditingCompany(false);
              setShowLogin(false);
              setShowDocs(false);
              setSelectedCompany(null);
              setIsAddingDoc(false);
              setIsEditingDoc(false);
            }}
            className="flex items-center px-4 py-2 rounded-full font-semibold text-white shadow-lg transition-all duration-300
                       bg-blue-600 hover:bg-blue-700 transform hover:scale-105"
          >
            <Search size={16} className="mr-2" />
            Syarikat
          </button>
          <button
            onClick={() => {
              setShowDocs(true);
              setIsAddingCompany(false);
              setIsEditingCompany(false);
              setShowLogin(false);
            }}
            className="flex items-center px-4 py-2 rounded-full font-semibold text-gray-700 shadow-lg transition-all duration-300
                       bg-white hover:bg-gray-200 transform hover:scale-105"
          >
            <Book size={16} className="mr-2" />
            Dokumen
          </button>
        </div>

        {/* Paparan Dokumen */}
        {showDocs && (
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 text-center">
                Dokumen Latihan Industri
              </h2>
              {isAdmin && (
                <button
                  onClick={() => {
                    setIsAddingDoc(true);
                    setIsEditingDoc(false);
                    setNewDoc({ id: docs.length + 1, nama: '', file: null, url: '' });
                  }}
                  className="flex items-center bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors"
                >
                  <Plus size={16} className="mr-2" />
                  Tambah Dokumen
                </button>
              )}
            </div>

            {isAddingDoc && (
              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Borang Tambah Dokumen</h3>
                <form onSubmit={handleAddDoc} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nama Dokumen</label>
                    <input
                      type="text"
                      value={newDoc.nama}
                      onChange={(e) => setNewDoc({...newDoc, nama: e.target.value})}
                      className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fail PDF</label>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => setNewDoc({...newDoc, file: e.target.files[0]})}
                      className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-colors"
                  >
                    Muat Naik Dokumen
                  </button>
                  <button
                      type="button"
                      onClick={() => setIsAddingDoc(false)}
                      className="w-full bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
                  >
                      Batal
                  </button>
                </form>
              </div>
            )}

            {isEditingDoc && (
              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Sunting Dokumen</h3>
                <form onSubmit={handleUpdateDoc} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nama Dokumen</label>
                    <input
                      type="text"
                      value={newDoc.nama}
                      onChange={(e) => setNewDoc({...newDoc, nama: e.target.value})}
                      className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div className="flex justify-between space-x-4">
                    <button
                      type="submit"
                      className="flex-1 bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
                    >
                      Kemas Kini Dokumen
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsEditingDoc(false)}
                        className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
                    >
                        Batal
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            <div className="mt-6 space-y-4">
              {docs.map(doc => (
                <div key={doc.id} className="bg-gray-100 p-4 rounded-lg text-left flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText size={20} className="text-blue-600" />
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="font-medium text-gray-800 hover:underline">{doc.nama}</a>
                  </div>
                  {isAdmin && (
                    <div className="flex space-x-2">
                       <button
                        onClick={(e) => { e.stopPropagation(); handleEditDocClick(doc); }}
                        className="p-1 rounded-lg text-yellow-600 hover:bg-yellow-100 transition-colors"
                        title="Edit Dokumen"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteDoc(doc.id); }}
                        className="p-1 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
                        title="Padam Dokumen"
                      >
                        <Trash size={20} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Paparan Utama Pangkalan Data Syarikat */}
        {!showDocs && (
          <>
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
                  Cari Syarikat
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                    title="Paparan Kad"
                  >
                    <LayoutGrid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                    title="Paparan Senarai"
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="relative">
                  <select
                    name="negeri"
                    value={filters.negeri}
                    onChange={handleFilterChange}
                    className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-gray-700"
                  >
                    {negeri.map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>

                <div className="relative">
                  <select
                    name="daerah"
                    value={filters.daerah}
                    onChange={handleFilterChange}
                    className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-gray-700"
                    disabled={filters.negeri === 'Semua'}
                  >
                    {daerah[filters.negeri] && daerah[filters.negeri].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
                
                <div className="relative">
                  <select
                    name="jenis"
                    value={filters.jenis}
                    onChange={handleFilterChange}
                    className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-gray-700"
                  >
                    {jenisPerusahaan.map(j => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>
            </div>
          
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCompanies.length > 0 ? (
                  currentCompanies.map(company => (
                    <div
                      key={company.bil}
                      onClick={() => setSelectedCompany(company)}
                      className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500 transition-shadow cursor-pointer group relative overflow-hidden"
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {company.nama}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p className="flex items-center"><MapPin className="text-blue-500 mr-2" size={16} />{company.daerah}, {company.negeri}</p>
                        <p className="flex items-center"><Briefcase className="text-blue-500 mr-2" size={16} />{company.jenis}</p>
                      </div>
                      {isAdmin && (
                        <div className="flex space-x-2 mt-4">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleEditClick(company); }}
                            className="flex items-center bg-yellow-500 text-white font-semibold px-3 py-1 rounded-lg text-sm hover:bg-yellow-600 transition-colors"
                          >
                            <Edit size={16} className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteCompany(company.bil); }}
                            className="flex items-center bg-red-600 text-white font-semibold px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition-colors"
                          >
                            <Trash size={16} className="mr-1" /> Padam
                          </button>
                        </div>
                      )}
                      {!isAdmin && (
                        <div className="absolute inset-0 bg-white bg-opacity-95 backdrop-blur-sm flex items-center justify-center p-6 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <div className="text-center">
                            <h4 className="font-bold text-md mb-2">{company.nama}</h4>
                            <div className="space-y-2 text-sm text-gray-700">
                              <p className="flex items-center justify-center"><Phone className="text-blue-500 mr-2" size={16} />{company.tel}</p>
                              {company.emel && (
                                <p className="flex items-center justify-center"><Mail className="text-blue-500 mr-2" size={16} />{company.emel}</p>
                              )}
                              <a
                                href={company.lokasi}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-2 text-blue-600 hover:underline"
                              >
                                Lihat Lokasi di Peta
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-gray-500 text-lg py-12">
                    Tiada syarikat ditemui.
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md divide-y divide-gray-200">
                {currentCompanies.length > 0 ? (
                  currentCompanies.map(company => (
                    <div
                      key={company.bil}
                      onClick={() => setSelectedCompany(company)}
                      className="p-4 sm:p-6 hover:bg-gray-50 transition-colors cursor-pointer group flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 hover:underline">{company.nama}</h3>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <MapPin className="text-blue-500 mr-2" size={14} />
                          {company.alamat}, {company.daerah}, {company.negeri}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <Briefcase className="text-blue-500 mr-2" size={14} />
                          {company.jenis}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center mt-1">
                          <Phone className="text-blue-500 mr-2" size={14} />
                          {company.tel}
                        </p>
                        {company.emel && (
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <Mail className="text-blue-500 mr-2" size={14} />
                            {company.emel}
                          </p>
                        )}
                        <a
                          href={company.lokasi}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-blue-600 hover:underline text-sm"
                        >
                          Lihat Lokasi di Peta
                        </a>
                      </div>
                      {isAdmin ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleEditClick(company); }}
                            className="p-2 rounded-lg text-yellow-600 hover:bg-yellow-100 transition-colors"
                            title="Edit Syarikat"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeleteCompany(company.bil); }}
                            className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
                            title="Padam Syarikat"
                          >
                            <Trash size={20} />
                          </button>
                        </div>
                      ) : (
                         <ChevronRight size={24} className="text-gray-400" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 text-lg py-12">
                    Tiada syarikat ditemui.
                  </div>
                )}
              </div>
            )}

            {/* Kawalan Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full transition-colors ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
                >
                  <ChevronLeft size={24} />
                </button>
                {[...Array(totalPages).keys()].map(page => (
                  <button
                    key={page + 1}
                    onClick={() => setCurrentPage(page + 1)}
                    className={`w-10 h-10 rounded-full font-semibold transition-colors ${
                      currentPage === page + 1 ? 'bg-blue-600 text-white shadow-md' : 'text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full transition-colors ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
            
            {/* Butang Tambah/Log Keluar Admin */}
            <div className="mt-8 text-center">
                {isAdmin ? (
                    <div className="flex space-x-4 justify-center">
                        <button
                          onClick={() => {
                            setIsAddingCompany(true);
                            setIsEditingCompany(false);
                            setNewCompany({ bil: companies.length + 1, nama: '', alamat: '', negeri: '', daerah: '', jenis: '', tel: '', emel: '', lokasi: '' });
                          }}
                          className="bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <Plus className="mr-2" size={20} />
                          Tambah Syarikat
                        </button>
                        <button
                          onClick={handleLogout}
                          className="bg-red-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                        >
                            <LogOut className="mr-2" size={20} />
                            Log Keluar Admin
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowLogin(true)}
                        className="bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center mx-auto space-x-2 transform hover:scale-105"
                    >
                        <User size={20} />
                        <span>Log Masuk Admin</span>
                    </button>
                )}
            </div>
          </>
        )}

        {/* Modal Pengesahan Padam Dokumen */}
        {docToDelete && (
          <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Pengesahan Padam Dokumen</h2>
              <p className="text-gray-700 mb-6">
                Adakah anda pasti ingin memadam dokumen ini? Tindakan ini tidak boleh dibatalkan.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={confirmDeleteDoc}
                  className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-700 transition-colors"
                >
                  Ya, Padam
                </button>
                <button
                  onClick={cancelDeleteDoc}
                  className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Pengesahan Padam Syarikat */}
        {companyToDelete && (
          <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Pengesahan Padam Syarikat</h2>
              <p className="text-gray-700 mb-6">
                Adakah anda pasti ingin memadam syarikat ini? Tindakan ini tidak boleh dibatalkan.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={confirmDeleteCompany}
                  className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-700 transition-colors"
                >
                  Ya, Padam
                </button>
                <button
                  onClick={cancelDeleteCompany}
                  className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Paparan Dokumen */}
        {selectedDoc && (
          <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full relative">
              <button
                onClick={() => setSelectedDoc(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XCircle size={28} />
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{docs.find(d => d.id === selectedDoc)?.nama}</h2>
              <p className="text-gray-700">
                Dokumen ini akan dibuka dalam tetingkap baharu.
              </p>
              <a
                href={docs.find(d => d.id === selectedDoc)?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
              >
                Buka Dokumen
              </a>
            </div>
          </div>
        )}

        {/* Borang Log Masuk Admin */}
        {showLogin && (
          <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Log Masuk Admin</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    required
                  />
                </div>
                <div className="flex justify-center pt-2 space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                  >
                    Log Masuk
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Borang Tambah/Edit Syarikat (Hanya untuk Admin) */}
        {(isAddingCompany || isEditingCompany) && isAdmin && (
          <div className="mt-8 bg-white p-6 sm:p-8 rounded-xl shadow-md">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
              {isEditingCompany ? 'Sunting Maklumat Syarikat' : 'Borang Tambah Syarikat'}
            </h2>
            <form onSubmit={isEditingCompany ? handleUpdateCompany : handleAddCompany} className="space-y-4">
              <div>
                <label className="block text-gray-700">Nama Syarikat</label>
                <input
                  type="text"
                  name="nama"
                  value={newCompany.nama}
                  onChange={handleNewCompanyChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Alamat Syarikat</label>
                <input
                  type="text"
                  name="alamat"
                  value={newCompany.alamat}
                  onChange={handleNewCompanyChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Negeri</label>
                  <select
                    name="negeri"
                    value={newCompany.negeri}
                    onChange={handleNewCompanyChange}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="" disabled>Pilih Negeri</option>
                    {negeri.slice(1).map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Daerah</label>
                    <select
                        name="daerah"
                        value={newCompany.daerah}
                        onChange={handleNewCompanyChange}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                        disabled={!newCompany.negeri}
                    >
                        <option value="" disabled>Pilih Daerah</option>
                        {newCompany.negeri && daerah[newCompany.negeri] && (
                          daerah[newCompany.negeri].slice(1).map(d => (
                            <option key={d} value={d}>{d}</option>
                          ))
                        )}
                    </select>
                  </div>
              </div>
              <div>
                <label className="block text-gray-700">Jenis Perusahaan</label>
                <select
                  name="jenis"
                  value={newCompany.jenis}
                  onChange={handleNewCompanyChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="" disabled>Pilih Jenis</option>
                  {jenisPerusahaan.slice(1).map(j => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700">No. Telefon</label>
                <input
                  type="tel"
                  name="tel"
                  value={newCompany.tel}
                  onChange={handleNewCompanyChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Emel (Pilihan)</label>
                <input
                  type="email"
                  name="emel"
                  value={newCompany.emel}
                  onChange={handleNewCompanyChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Lokasi Google Maps URL</label>
                <input
                  type="url"
                  name="lokasi"
                  value={newCompany.lokasi}
                  onChange={handleNewCompanyChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., https://maps.app.goo.gl/..."
                  required
                />
              </div>
              <div className="flex justify-between pt-2 space-x-4">
                <button
                    type="submit"
                    className="w-full mt-4 bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-colors"
                >
                  {isEditingCompany ? 'Kemas Kini Syarikat' : 'Simpan Syarikat'}
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setIsAddingCompany(false);
                        setIsEditingCompany(false);
                        setEditCompanyId(null);
                        setNewCompany({
                            bil: companies.length + 1,
                            nama: '',
                            alamat: '',
                            negeri: '',
                            daerah: '',
                            jenis: '',
                            tel: '',
                            emel: '',
                            lokasi: ''
                        });
                    }}
                    className="w-full mt-4 bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
                >
                    Batal
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// Gabungkan komponen utama dan landing page ke dalam satu komponen untuk tujuan demonstrasi.
const App = () => {
    const [showMainApp, setShowMainApp] = useState(false);

    const handleStartSearch = () => {
        setShowMainApp(true);
    };

    if (showMainApp) {
        return <MainApp />;
    }

    return (
        <div className="font-sans antialiased bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative">
            <div className="absolute inset-0 bg-cover bg-center opacity-30 z-0" style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8fHx8fA%3D%3D')`
            }}></div>
            <div className="container mx-auto max-w-4xl text-center text-white z-10">
              <h1 className="text-4xl sm:text-6xl font-bold uppercase tracking-wide mb-4 drop-shadow-lg">
                Pangkalan Data Syarikat LI
              </h1>
              <p className="text-xl sm:text-2xl font-light mb-8 drop-shadow-md">
                Selamat Datang Ke ADTEC JTM Kampus Sandakan
              </p>
              <p className="text-base sm:text-lg text-gray-300 mb-12 max-w-2xl mx-auto drop-shadow-sm">
                Sistem ini direka untuk membantu pelajar Teknologi Komputer Rangkaian ADTEC JTM Kampus Sandakan mencari tempat Latihan Industri (LI) yang bersesuaian di seluruh Sabah.
              </p>
              <button
                onClick={handleStartSearch}
                className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto space-x-2 transform hover:scale-105"
              >
                <Search size={20} />
                <span>Mula Carian</span>
              </button>
            </div>
        </div>
    );
};

export default App;
