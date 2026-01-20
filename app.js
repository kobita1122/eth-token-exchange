// REPLACE WITH DEPLOYED ADDRESSES
const TOKEN_ADDRESS = "YOUR_TOKEN_ADDRESS";
const DEX_ADDRESS = "YOUR_DEX_ADDRESS";

const DEX_ABI = [
    "function buyTokens() external payable",
    "function sellTokens(uint256 amount) external",
    "function rate() view returns (uint256)"
];
const TOKEN_ABI = [
    "function approve(address spender, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)"
];

let provider, signer, dexContract, tokenContract, rate;

async function init() {
    if(!window.ethereum) return alert("Install MetaMask");
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();

    dexContract = new ethers.Contract(DEX_ADDRESS, DEX_ABI, signer);
    tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
    
    rate = await dexContract.rate();
    document.getElementById("connectBtn").innerText = "Connected";
}

// Calculate Output on Input
document.getElementById("buyInput").oninput = (e) => {
    if(!rate) return;
    document.getElementById("buyOutput").value = e.target.value * rate;
};

document.getElementById("buyBtn").onclick = async () => {
    const amt = document.getElementById("buyInput").value;
    if(!amt) return;
    setStatus(" buying...");
    try {
        const tx = await dexContract.buyTokens({ value: ethers.utils.parseEther(amt) });
        await tx.wait();
        setStatus("Purchase Successful!");
    } catch(e) { setStatus("Error: " + e.message); }
};

document.getElementById("approveBtn").onclick = async () => {
    const amt = document.getElementById("sellInput").value;
    if(!amt) return;
    setStatus("Approving...");
    try {
        const wei = ethers.utils.parseEther(amt);
        const tx = await tokenContract.approve(DEX_ADDRESS, wei);
        await tx.wait();
        setStatus("Approved! Now Sell.");
        document.getElementById("sellBtn").disabled = false;
    } catch(e) { setStatus("Error: " + e.message); }
};

document.getElementById("sellBtn").onclick = async () => {
    const amt = document.getElementById("sellInput").value;
    const wei = ethers.utils.parseEther(amt);
    setStatus("Selling...");
    try {
        const tx = await dexContract.sellTokens(wei);
        await tx.wait();
        setStatus("Sold Successfully!");
    } catch(e) { setStatus("Error: " + e.message); }
};

function setStatus(msg) { document.getElementById("status").innerText = msg; }
document.getElementById("connectBtn").onclick = init;
