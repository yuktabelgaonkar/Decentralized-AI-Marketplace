async function main() {
    const AIContract = await ethers.getContractFactory("AIContract");
    const aiContract = await AIContract.deploy();
    await aiContract.deployed();
    console.log("AIContract deployed to:", aiContract.address);

    const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy();
    await marketplace.deployed();
    console.log("Marketplace deployed to:", marketplace.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
