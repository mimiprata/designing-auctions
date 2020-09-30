pragma solidity ^0.4.24;
import "./SafeMath.sol";
import "./ERC721.sol";


contract AdorableToken is ERC721 {
    using SafeMath for uint256;

    string public constant name = "Adorable Token";
    string public constant symbol = "AT";

    struct Token {
        string name;
        string description;
    }
    Token[] internal tokens;

    event Mint(uint256 tokenIndex, address owner);

    constructor() public {
        _mintToken(msg.sender, "Mimi", "The cutest token in the Milky Way");

    }

    function _mintToken(address owner, string memory nameToken, string memory description) internal returns (uint256) {
        Token memory token = Token({
            name: nameToken,
            description: description
            });
        uint256 index = tokens.push(token) - 1;
        emit Mint(index, msg.sender);

        addTokenTo(owner, index);
        emit Transfer(address(0), owner, index);

        return index;
    }

    function getTotalTokens() public view returns (uint) { return tokens.length; }
    function getName(uint256 _tokenId) public view returns ( string memory) { return tokens[_tokenId].name; }
    function getDescription(uint256 _tokenId) public view returns (string memory) { return tokens[_tokenId].description; }
}
