const githubRepoRawUrl =
  "https://raw.githubusercontent.com/ravikumarr1802/LeetcodeDsa/refs/heads/main/";

// Company list (same as your reference)
const companyList = [
  "AMD", "Accenture", "Accolite", "Adobe", "Affirm", "Agoda", "Airbnb",
  "Airtel", "Akamai", "Akuna Capital", "Alibaba", "Altimetrik", "Amazon",
  "Amdocs", "American Express", "Anduril", "Apple", "Arcesium", "Arista Networks",
  "Atlassian", "Attentive", "Autodesk", "Avito", "BNY Mellon", "BP", "Baidu",
  "Barclays", "BitGo", "BlackRock", "Blizzard", "Block", "Bloomberg", "Bolt",
  "Booking.com", "Box", "ByteDance", "CARS24", "Cadence", "Capgemini",
  "Capital One", "Cashfree", "Chewy", "Cisco", "Citadel", "Citrix", "Cloudera",
  "Cloudflare", "Cognizant", "Coinbase", "Commvault", "Confluent", "ConsultAdd",
  "Coupang", "Coursera", "CrowdStrike", "Cruise", "CureFit", "DE Shaw",
  "DP world", "DRW", "Darwinbox", "Databricks", "Datadog", "Deliveroo", "Dell",
  "Deloitte", "Deutsche Bank", "DevRev", "Directi", "Disney", "Docusign",
  "DoorDash", "Dream11", "Dropbox", "Dunzo", "EPAM Systems", "Epic Systems",
  "Expedia", "FactSet", "Flexport", "Flipkart", "FreshWorks", "GE Healthcare",
  "GSN Games", "Geico", "Gojek", "Goldman Sachs", "Google", "Grab", "Grammarly",
  "Graviton", "Groww", "HCL", "HPE", "HashedIn", "Huawei", "Hubspot",
  "Hudson River Trading", "Hulu", "IBM", "IMC", "IXL", "InMobi", "Indeed",
  "Infosys", "Instacart", "Intel", "Intuit", "J.P. Morgan", "Jane Street",
  "Jump Trading", "Juspay", "KLA", "Karat", "LinkedIn", "LiveRamp", "Lowe's",
  "Lucid", "Lyft", "MakeMyTrip", "Mastercard", "MathWorks", "Media.net",
  "Meesho", "Mercari", "Meta", "Microsoft", "Millennium", "Mitsogo", "Moloco",
  "MongoDB", "Morgan Stanley", "Moveworks", "Myntra", "Nagarro", "NetApp",
  "Netflix", "Nextdoor", "Niantic", "Nielsen", "Nike", "Nordstrom", "Nutanix",
  "Nvidia", "OKX", "Okta", "OpenAI", "Oracle", "Otter.ai", "Ozon",
  "Palantir Technologies", "Palo Alto Networks", "PayPal", "Paytm", "PhonePe",
  "Pinterest", "Pocket Gems", "Point72", "PornHub", "Pure Storage", "Qualcomm",
  "Quora", "RBC", "Rakuten", "Reddit", "Revolut", "Ripple", "Rippling",
  "Robinhood", "Roblox", "Roku", "Rubrik", "SAP", "SIG", "Salesforce",
  "Samsara", "Samsung", "ServiceNow", "Shopee", "Shopify", "Siemens",
  "Sigmoid", "Snap", "Snowflake", "SoFi", "Splunk", "Spotify", "Sprinklr",
  "Squarepoint Capital", "Stripe", "Swiggy", "Tekion", "Tencent", "Tesla",
  "ThoughtWorks", "TikTok", "Tinkoff", "Trilogy", "Turing", "Turo", "Twilio",
  "Twitch", "Two Sigma", "UKG", "Uber", "UiPath", "VK", "VMware",
  "Veeva Systems", "Verily", "Verkada", "Virtu Financial", "Visa",
  "Walmart Labs", "Warnermedia", "Wayfair", "Wells Fargo", "Wipro", "Wix",
  "Workday", "X", "Yahoo", "Yandex", "Yelp", "ZS Associates", "ZScaler",
  "Zalando", "Zenefits", "Zepto", "Zeta", "Zillow", "Zoho", "Zomato",
  "Zopsmart", "athenahealth", "carwale", "eBay", "jio", "josh technology",
  "opentext", "oyo", "persistent systems", "razorpay", "tcs", "thoughtspot",
];

const select = document.getElementById("companySelect");
const tableBody = document.querySelector("#dataTable tbody");
const rowCount = document.getElementById("rowCount");
const pagination = document.getElementById("pagination");
const pageNumbers = document.getElementById("pageNumbers");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const topicFilter = document.getElementById("topicFilter");
const difficultyFilter = document.getElementById("difficultyFilter");
const searchBar = document.getElementById("searchBar");

let sortDirection = {};
let allRows = [];
let filteredRows = [];
let currentPage = 1;
let rowsPerPage = 25;
let totalPages = 0;

// Populate company dropdown
companyList.forEach((company) => {
  const option = document.createElement("option");
  option.value = company;
  option.textContent = company;
  select.appendChild(option);
});

select.addEventListener("change", () => {
  const company = select.value;
  if (company) {
    const fileUrl = `${githubRepoRawUrl}${company}.csv`;
    fetchCSV(fileUrl);
  } else {
    tableBody.innerHTML = "";
    pagination.classList.add("hidden");
    rowCount.classList.add("hidden");
    allRows = [];
    filteredRows = [];
    currentPage = 1;
  }
});

async function fetchCSV(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("File not found.");
    const data = await response.text();
    renderTable(data);
  } catch (err) {
    console.error(err);
    tableBody.innerHTML = "<tr><td colspan='7'>Failed to load data.</td></tr>";
    pagination.classList.add("hidden");
    rowCount.classList.add("hidden");
  }
}

function renderTable(csvText) {
  const rows = csvText.trim().split("\n").slice(1);
  allRows = rows;
  currentPage = 1;
  totalPages = Math.ceil(rows.length / rowsPerPage);

  extractTopics(rows);
  applyFilters();
}

// Parse CSV row
function parseCSVRow(row) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

// Extract unique topics
function extractTopics(rows) {
  const topicSet = new Set();
  rows.forEach((row) => {
    const cols = parseCSVRow(row);
    if (cols[5]) cols[5].split(";").forEach((t) => topicSet.add(t.trim()));
  });
  topicFilter.innerHTML = "";
  [...topicSet].sort().forEach((t) => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    topicFilter.appendChild(opt);
  });
}

// Apply filters
function applyFilters() {
  filteredRows = allRows.filter((row) => {
    const cols = parseCSVRow(row);
    const difficulty = cols[0].replace(/["']/g, "");
    const title = cols[1].toLowerCase();
    const topics = (cols[5] || "").toLowerCase();

    if (difficultyFilter.value && difficulty !== difficultyFilter.value)
      return false;
    if (searchBar.value && !title.includes(searchBar.value.toLowerCase()))
      return false;
    const selectedTopics = [...topicFilter.selectedOptions].map((opt) =>
      opt.value.toLowerCase()
    );
    if (selectedTopics.length > 0) {
      return selectedTopics.every((t) => topics.includes(t));
    }
    return true;
  });

  totalPages = Math.ceil(filteredRows.length / rowsPerPage) || 1;
  currentPage = 1;
  displayCurrentPage();
  setupPagination();
  updateRowCount();
}

// Display rows
function displayCurrentPage() {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredRows.slice(startIndex, endIndex);
  displayRows(currentRows, startIndex);
}

function displayRows(rows, startIndex = 0) {
  tableBody.innerHTML = "";
  rows.forEach((row, index) => {
    const cols = parseCSVRow(row);
    const tr = document.createElement("tr");

    const serialTd = document.createElement("td");
    serialTd.textContent = startIndex + index + 1;
    tr.appendChild(serialTd);

    cols.slice(0, 6).forEach((col, idx) => {
      const td = document.createElement("td");
      col = col.replace(/["']/g, "");

      if (idx === 0) {
        td.textContent = col;
        td.classList.add("difficulty", col.toUpperCase());
      } else if (idx === 1) {
        td.textContent = col;
      } else if (idx === 3) {
        const rate = parseFloat(col);
        td.textContent = !isNaN(rate) ? rate.toFixed(2) + "%" : col;
      } else if (idx === 4) {
        const a = document.createElement("a");
        a.href = col;
        a.textContent = "View";
        a.target = "_blank";
        td.appendChild(a);
      } else {
        td.textContent = col;
      }
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });
}

// Pagination functions
function setupPagination() {
  if (totalPages <= 1) {
    pagination.classList.add("hidden");
    return;
  }
  pagination.classList.remove("hidden");
  renderPageNumbers();
  updatePaginationButtons();
}

function renderPageNumbers() {
  pageNumbers.innerHTML = "";
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  if (startPage > 1) {
    addPageNumber(1);
    if (startPage > 2) addEllipsis();
  }
  for (let i = startPage; i <= endPage; i++) addPageNumber(i);
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) addEllipsis();
    addPageNumber(totalPages);
  }
}
function addPageNumber(pageNum) {
  const pageBtn = document.createElement("div");
  pageBtn.className = `page-number ${pageNum === currentPage ? "active" : ""}`;
  pageBtn.textContent = pageNum;
  pageBtn.onclick = () => goToPage(pageNum);
  pageNumbers.appendChild(pageBtn);
}
function addEllipsis() {
  const ellipsis = document.createElement("div");
  ellipsis.className = "page-number ellipsis";
  ellipsis.textContent = "...";
  pageNumbers.appendChild(ellipsis);
}
function updatePaginationButtons() {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}
function goToPage(pageNum) {
  if (pageNum >= 1 && pageNum <= totalPages && pageNum !== currentPage) {
    currentPage = pageNum;
    displayCurrentPage();
    renderPageNumbers();
    updatePaginationButtons();
    updateRowCount();
  }
}
function changePage(direction) {
  const newPage = currentPage + direction;
  goToPage(newPage);
}
function updateRowCount() {
  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, filteredRows.length);
  rowCount.textContent = `Showing ${startIndex}-${endIndex} of ${filteredRows.length} problems (Page ${currentPage} of ${totalPages})`;
  rowCount.classList.remove("hidden");
}

// Sorting
function sortTable(columnIndex) {
  const headers = document.querySelectorAll("#dataTable thead th");

  // toggle sort direction
  sortDirection[columnIndex] = !sortDirection[columnIndex];
  const asc = sortDirection[columnIndex];

  filteredRows.sort((a, b) => {
    const aCols = parseCSVRow(a);
    const bCols = parseCSVRow(b);

    let valA = aCols[columnIndex] ? aCols[columnIndex].replace(/["']/g, "") : "";
    let valB = bCols[columnIndex] ? bCols[columnIndex].replace(/["']/g, "") : "";

    // try numeric sort first
    if (!isNaN(valA) && !isNaN(valB)) {
      return asc ? valA - valB : valB - valA;
    }

    return asc ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  displayCurrentPage();

  headers.forEach((h) => h.classList.remove("sorted-asc", "sorted-desc"));
  headers[columnIndex].classList.add(asc ? "sorted-asc" : "sorted-desc");
}
