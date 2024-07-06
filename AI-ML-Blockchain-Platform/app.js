const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

// AI Contract setup
let aiContractAddress = '<<AI_CONTRACT_ADDRESS>>'; 
let aiContractABI = [<<AI_CONTRACT_ABI>>];
let aiContract = new web3.eth.Contract(aiContractABI, aiContractAddress);

// Marketplace setup
let marketplaceAddress = '<<MARKETPLACE_CONTRACT_ADDRESS>>'; 
let marketplaceABI = [<<MARKETPLACE_CONTRACT_ABI>>];
let marketplace = new web3.eth.Contract(marketplaceABI, marketplaceAddress);

// Function to set data in AI contract
async function setData() {
    let accounts = await web3.eth.getAccounts();
    let data = document.getElementById("dataInput").value;
    await aiContract.methods.setData(data).send({ from: accounts[0] });
}

// Function to get data from AI contract
async function getData() {
    let data = await aiContract.methods.getData().call();
    document.getElementById("dataOutput").innerText = data;
}

// Function to upload dataset to IPFS and list it on the marketplace
async function uploadAndListDataset() {
    let accounts = await web3.eth.getAccounts();
    let name = document.getElementById("nameInput").value;
    let description = document.getElementById("descriptionInput").value;
    let price = document.getElementById("priceInput").value;

    // For simplicity, using the provided IPFS hash directly
    let dataHash = '......';

    // Create dataset on blockchain
    await marketplace.methods.createDataset(name, description, dataHash, price).send({ from: accounts[0] });
    loadDatasets();
}

// Function to load datasets from the marketplace
async function loadDatasets() {
    let datasetCount = await marketplace.methods.datasetCount().call();
    let datasetsDiv = document.getElementById("datasets");
    datasetsDiv.innerHTML = '';
    for (let i = 1; i <= datasetCount; i++) {
        let dataset = await marketplace.methods.getDataset(i).call();
        let datasetElement = document.createElement('div');
        datasetElement.innerHTML = `<p>${dataset[0]}: ${dataset[1]}</p><a href="https://ipfs.io/ipfs/${dataset[2]}" target="_blank">View Data</a><button onclick="purchaseDataset(${dataset[0]})">Buy for ${web3.utils.fromWei(dataset[3], 'ether')} ETH</button>`;
        datasetsDiv.appendChild(datasetElement);
    }
}

// Function to purchase a dataset
async function purchaseDataset(id) {
    let accounts = await web3.eth.getAccounts();
    let dataset = await marketplace.methods.getDataset(id).call();
    await marketplace.methods.purchaseDataset(id).send({ from: accounts[0], value: dataset[3] });
    loadDatasets();
}

loadDatasets();
