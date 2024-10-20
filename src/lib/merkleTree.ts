// app/utils/merkleTree.ts
// import { MerkleTree } from "merkletreejs";
// import { ethers } from "ethers";

// export function generateMerkleTree(
//   balances: { user: string; token: string; amount: string }[]
// ) {
// const leaves = balances.map((b) =>
//   ethers.keccak256(
//     ethers.defaultAbiCoder.encode(
//       ["address", "address", "uint256"],
//       [b.user, b.token, ethers.parseUnits(b.amount, 18)]
//     )
//   )
// );
// return new MerkleTree(leaves, ethers.keccak256, { sortPairs: true });
// }

// export function generateMerkleProof(
//   tree: MerkleTree,
//   user: string,
//   token: string,
//   amount: string
// ) {
//   const leaf = ethers.keccak256(
//     ethers.defaultAbiCoder.encode(
//       ["address", "address", "uint256"],
//       [user, token, ethers.parseUnits(amount, 18)]
//     )
//   );
//   return tree.getHexProof(leaf);
// }

// export function verifyMerkleProof(
//   root: string,
//   proof: string[],
//   user: string,
//   token: string,
//   amount: string
// ) {
//   const leaf = ethers.keccak256(
//     ethers.defaultAbiCoder.encode(
//       ["address", "address", "uint256"],
//       [user, token, ethers.parseUnits(amount, 18)]
//     )
//   );
//   return MerkleTree.verify(proof, leaf, root, ethers.keccak256);
// }
