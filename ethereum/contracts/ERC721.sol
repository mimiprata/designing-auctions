pragma solidity ^0.4.24;

import "./SafeMath.sol";
import "./ERC721Interface.sol";


contract ERC721 is ERC721Interface {

    using SafeMath for uint256;

    // who owns which NFT
    mapping(uint256 => address) internal tokenOwner;

    // how many NFT an owner has (ownerAddress => tokenCounter)
    mapping (address => uint256) internal ownedTokensCount;

    mapping (uint256 => address) internal tokenApprovals;


    function balanceOf(address _owner) external view returns (uint256) {
        require(_owner != address(0));
        return ownedTokensCount[_owner];

    }

    function ownerOf(uint256 _tokenId) external view returns (address) {
        address owner = tokenOwner[_tokenId];
        require(owner != address(0));
        return owner;
    }

    function removeTokenFrom(address _from, uint256 _tokenId) internal {
        require(this.ownerOf(_tokenId) == _from);
        ownedTokensCount[_from] = ownedTokensCount[_from].sub(1);
        tokenOwner[_tokenId] = address(0);
    }

    function addTokenTo(address _to, uint256 _tokenId) internal {
        require(tokenOwner[_tokenId] == address(0));
        tokenOwner[_tokenId] = _to;
        ownedTokensCount[_to] = ownedTokensCount[_to].add(1);
    }
    modifier canTransfer(uint256 _tokenId) {
        require(isApprovedOrOwner(msg.sender, _tokenId));
        _;
    }

    function isApprovedOrOwner(address _spender, uint256 _tokenId) internal view returns (bool) {
        address owner = this.ownerOf(_tokenId);
        return _spender == owner || getApproved(_tokenId) == _spender;
    }


    function transferFrom(address _from, address _to, uint256 _tokenId) public canTransfer(_tokenId){
        require(_from != address(0));
        require(_to != address(0));
        clearApproval(_from, _tokenId);
        removeTokenFrom(_from, _tokenId);
        addTokenTo(_to, _tokenId);

        emit Transfer(_from, _to, _tokenId);
    }
    function clearApproval(address _owner, uint256 _tokenId) public {
        require(this.ownerOf(_tokenId) == _owner);
        if (tokenApprovals[_tokenId] != address(0)) {
            tokenApprovals[_tokenId] = address(0);
            emit Approval(_owner, address(0), _tokenId);
        }
    }

    function approve(address _approved, uint256 _tokenId) public {
        address owner = this.ownerOf(_tokenId);
        require(_approved != owner);
        require(msg.sender == owner);

        if (getApproved(_tokenId) != address(0) || _approved != address(0)) {
            tokenApprovals[_tokenId] = _approved;
            emit Approval(owner, _approved, _tokenId);
        }
    }
    function getApproved(uint256 _tokenId) public view returns (address) {
        return tokenApprovals[_tokenId];
    }

}

