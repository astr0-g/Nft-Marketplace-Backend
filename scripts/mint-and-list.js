const { ethers } = require("hardhat")
const PRICE = ethers.utils.parseEther("0.1")
async function mintAndList() {
  const nftMarketplace = await ethers.getContract("NftMarketplace")
  const basicNft = await ethers.getContract("BasicNFT")
  console.log("Minting NFT...")
  const mintTx = await basicNft.mintNFT()
  const mintTxReceipt = await mintTx.wait(1)
  const tokenId = mintTxReceipt.events[0].args.tokenId
  console.log(`${tokenId}`)
  console.log("Approving NFT...")
  const approvalTx = await basicNft.approve(nftMarketplace.address, tokenId)
  await approvalTx.wait(1)
  console.log("Listing NFT...")
  const Listingtx = await nftMarketplace.listItem(basicNft.address, tokenId, PRICE)
  await Listingtx.wait(1)
  console.log("NFT Listed")
}

mintAndList()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
