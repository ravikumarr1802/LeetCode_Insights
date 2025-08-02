const githubRepoRawUrl =
  "https://raw.githubusercontent.com/ravikumarr1802/LeetcodeDsa/refs/heads/main/";

const companyList = [
  "AMD",
  "Accenture",
  "Accolite",
  "Adobe",
  "Affirm",
  "Agoda",
  "Airbnb",
  "Airtel",
  "Akamai",
  "Akuna Capital",
  "Alibaba",
  "Altimetrik",
  "Amazon",
  "Amdocs",
  "American Express",
  "Anduril",
  "Apple",
  "Arcesium",
  "Arista Networks",
  "Atlassian",
  "Attentive",
  "Autodesk",
  "Avito",
  "BNY Mellon",
  "BP",
  "Baidu",
  "Barclays",
  "BitGo",
  "BlackRock",
  "Blizzard",
  "Block",
  "Bloomberg",
  "Bolt",
  "Booking.com",
  "Box",
  "ByteDance",
  "CARS24",
  "Cadence",
  "Capgemini",
  "Capital One",
  "Cashfree",
  "Chewy",
  "Cisco",
  "Citadel",
  "Citrix",
  "Cloudera",
  "Cloudflare",
  "Cognizant",
  "Coinbase",
  "Commvault",
  "Confluent",
  "ConsultAdd",
  "Coupang",
  "Coursera",
  "CrowdStrike",
  "Cruise",
  "CureFit",
  "DE Shaw",
  "DP world",
  "DRW",
  "Darwinbox",
  "Databricks",
  "Datadog",
  "Deliveroo",
  "Dell",
  "Deloitte",
  "Deutsche Bank",
  "DevRev",
  "Directi",
  "Disney",
  "Docusign",
  "DoorDash",
  "Dream11",
  "Dropbox",
  "Dunzo",
  "EPAM Systems",
  "Epic Systems",
  "Expedia",
  "FactSet",
  "Flexport",
  "Flipkart",
  "FreshWorks",
  "GE Healthcare",
  "GSN Games",
  "Geico",
  "Gojek",
  "Goldman Sachs",
  "Google",
  "Grab",
  "Grammarly",
  "Graviton",
  "Groww",
  "HCL",
  "HPE",
  "HashedIn",
  "Huawei",
  "Hubspot",
  "Hudson River Trading",
  "Hulu",
  "IBM",
  "IMC",
  "IXL",
  "InMobi",
  "Indeed",
  "Infosys",
  "Instacart",
  "Intel",
  "Intuit",
  "J.P. Morgan",
  "Jane Street",
  "Jump Trading",
  "Juspay",
  "KLA",
  "Karat",
  "LinkedIn",
  "LiveRamp",
  "Lowe's",
  "Lucid",
  "Lyft",
  "MakeMyTrip",
  "Mastercard",
  "MathWorks",
  "Media.net",
  "Meesho",
  "Mercari",
  "Meta",
  "Microsoft",
  "Millennium",
  "Mitsogo",
  "Moloco",
  "MongoDB",
  "Morgan Stanley",
  "Moveworks",
  "Myntra",
  "Nagarro",
  "NetApp",
  "Netflix",
  "Nextdoor",
  "Niantic",
  "Nielsen",
  "Nike",
  "Nordstrom",
  "Nutanix",
  "Nvidia",
  "OKX",
  "Okta",
  "OpenAI",
  "Oracle",
  "Otter.ai",
  "Ozon",
  "Palantir Technologies",
  "Palo Alto Networks",
  "PayPal",
  "Paytm",
  "PhonePe",
  "Pinterest",
  "Pocket Gems",
  "Point72",
  "PornHub",
  "Pure Storage",
  "Qualcomm",
  "Quora",
  "RBC",
  "Rakuten",
  "Reddit",
  "Revolut",
  "Ripple",
  "Rippling",
  "Robinhood",
  "Roblox",
  "Roku",
  "Rubrik",
  "SAP",
  "SIG",
  "Salesforce",
  "Samsara",
  "Samsung",
  "ServiceNow",
  "Shopee",
  "Shopify",
  "Siemens",
  "Sigmoid",
  "Snap",
  "Snowflake",
  "SoFi",
  "Splunk",
  "Spotify",
  "Sprinklr",
  "Squarepoint Capital",
  "Stripe",
  "Swiggy",
  "Tekion",
  "Tencent",
  "Tesla",
  "ThoughtWorks",
  "TikTok",
  "Tinkoff",
  "Trilogy",
  "Turing",
  "Turo",
  "Twilio",
  "Twitch",
  "Two Sigma",
  "UKG",
  "Uber",
  "UiPath",
  "VK",
  "VMware",
  "Veeva Systems",
  "Verily",
  "Verkada",
  "Virtu Financial",
  "Visa",
  "Walmart Labs",
  "Warnermedia",
  "Wayfair",
  "Wells Fargo",
  "Wipro",
  "Wix",
  "Workday",
  "X",
  "Yahoo",
  "Yandex",
  "Yelp",
  "ZS Associates",
  "ZScaler",
  "Zalando",
  "Zenefits",
  "Zepto",
  "Zeta",
  "Zillow",
  "Zoho",
  "Zomato",
  "Zopsmart",
  "athenahealth",
  "carwale",
  "eBay",
  "jio",
  "josh technology",
  "opentext",
  "oyo",
  "persistent systems",
  "razorpay",
  "tcs",
  "thoughtspot",
];

const select = document.getElementById("companySelect");
const tableBody = document.querySelector("#dataTable tbody");
const rowCount = document.getElementById("rowCount");
const pagination = document.getElementById("pagination");
const pageNumbers = document.getElementById("pageNumbers");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let sortDirection = {}; // Keep track of sort direction for each column
let allRows = []; // Store all rows
let currentPage = 1;
let rowsPerPage = 25;
let totalPages = 0;

// Populate dropdown
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
  const rows = csvText.trim().split("\n").slice(1); // Skip header
  allRows = rows; // Store all rows
  currentPage = 1;
  totalPages = Math.ceil(rows.length / rowsPerPage);

  displayCurrentPage();
  setupPagination();
  updateRowCount();
}

function displayCurrentPage() {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = allRows.slice(startIndex, endIndex);

  displayRows(currentRows, startIndex);
}

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

  // Add the last field
  result.push(current);

  return result;
}

function displayRows(rows, startIndex = 0) {
  tableBody.innerHTML = "";

  rows.forEach((row, index) => {
    const cols = parseCSVRow(row); // Use proper CSV parsing
    const tr = document.createElement("tr");

    // Add serial number as first column (based on overall position, not page position)
    const serialTd = document.createElement("td");
    serialTd.textContent = startIndex + index + 1;
    tr.appendChild(serialTd);

    // Only process the first 6 columns (Difficulty, Title, Frequency, Acceptance Rate, Link, Topics)
    for (let idx = 0; idx < 6; idx++) {
      const td = document.createElement("td");
      const col = cols[idx] || ""; // Handle missing columns

      if (idx === 4) {
        // Make the Link clickable (column index 4 = Link)
        const a = document.createElement("a");
        a.href = col.replace(/["']/g, "");
        a.textContent = "View";
        a.target = "_blank";
        td.appendChild(a);
      } else {
        let cellContent = col;

        // Handle acceptance rate - round to 2 decimal places
        if (idx === 3) {
          // Acceptance Rate column (index 3 in CSV data)
          const rate = parseFloat(cellContent.replace(/["%]/g, ""));
          if (!isNaN(rate)) {
            cellContent = rate.toFixed(2) + "%";
          }
        }

        // Remove all quotation marks from all columns (especially topics)
        cellContent = cellContent.replace(/["']/g, ""); // Remove both " and '

        td.textContent = cellContent;
      }
      tr.appendChild(td);
    }
    tableBody.appendChild(tr);
  });
}

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

  // Adjust start page if we're near the end
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Add first page and ellipsis if needed
  if (startPage > 1) {
    addPageNumber(1);
    if (startPage > 2) {
      addEllipsis();
    }
  }

  // Add visible page numbers
  for (let i = startPage; i <= endPage; i++) {
    addPageNumber(i);
  }

  // Add ellipsis and last page if needed
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      addEllipsis();
    }
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
  const endIndex = Math.min(currentPage * rowsPerPage, allRows.length);
  rowCount.textContent = `Showing ${startIndex}-${endIndex} of ${allRows.length} problems (Page ${currentPage} of ${totalPages})`;
  rowCount.classList.remove("hidden");
}

function sortTable(columnIndex) {
  const table = document.querySelector("#dataTable");
  const headers = table.querySelectorAll("th");

  // Toggle sort direction
  if (!sortDirection[columnIndex]) {
    sortDirection[columnIndex] = "asc";
  } else {
    sortDirection[columnIndex] =
      sortDirection[columnIndex] === "asc" ? "desc" : "asc";
  }

  // Remove sort classes from all headers
  headers.forEach((header) => {
    header.classList.remove("sort-asc", "sort-desc");
  });

  // Add sort class to current header
  headers[columnIndex].classList.add(
    sortDirection[columnIndex] === "asc" ? "sort-asc" : "sort-desc"
  );

  // Sort the allRows array
  allRows.sort((a, b) => {
    const aCols = parseCSVRow(a); // Use proper CSV parsing
    const bCols = parseCSVRow(b); // Use proper CSV parsing

    let aValue, bValue;

    // Get values based on column index (subtract 1 because we don't have serial number in CSV)
    if (columnIndex === 1) {
      aValue = aCols[0]; // Difficulty
      bValue = bCols[0];
    } else {
      aValue = aCols[columnIndex - 1]; // Other columns
      bValue = bCols[columnIndex - 1];
    }

    // Clean values by removing quotes
    aValue = (aValue || "").replace(/["']/g, "");
    bValue = (bValue || "").replace(/["']/g, "");

    // Handle different data types
    if (columnIndex === 3) {
      // Frequency - numeric
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    } else if (columnIndex === 4) {
      // Acceptance Rate - numeric
      aValue = parseFloat(aValue.replace("%", ""));
      bValue = parseFloat(bValue.replace("%", ""));
    } else if (columnIndex === 1) {
      // Difficulty - custom order
      const difficultyOrder = { EASY: 1, MEDIUM: 2, HARD: 3 };
      aValue = difficultyOrder[aValue] || 0;
      bValue = difficultyOrder[bValue] || 0;
    }

    if (aValue < bValue) return sortDirection[columnIndex] === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection[columnIndex] === "asc" ? 1 : -1;
    return 0;
  });

  // Reset to first page and update display
  currentPage = 1;
  displayCurrentPage();
  renderPageNumbers();
  updatePaginationButtons();
  updateRowCount();
}
