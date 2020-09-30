pragma solidity ^0.4.24;
import "./AdorableToken.sol";
import "./SafeMath.sol";
contract SealedBidEngine {

    enum State {Started, Revealing, Ended, Canceled}
    event HasRevealed(address bidder, uint256 _auctionId);
    event HasFinalized( address bidder, uint256 _auctionId);
    event AuctionCreated(bytes32 hash, uint256 _tokenId, uint256 _auctionId);
    struct SealedBidAuction{

        uint256  startingPrice;
        uint256  durationBidding;
        uint256  durationRevealing;
        uint256  tokenId;

        address  owner;

        address winningBidder;
        uint256  winningBid;
        uint256 startedAt;
        mapping(address => uint256) balances;

        mapping(address => bytes32)  hashedBids;
        address  tokenAddress;

        uint256 bidsCount;
        State auctionState;

    }
    SealedBidAuction[] public sealedBidAuctions;

    function createSealedBidAuction(
        address _tokenAddress,
        uint256 _tokenId,
        uint256 _startingPrice,
        uint256 _endOfBidding,
        uint256 _endOfRevealing
    ) public returns(uint256){
        AdorableToken token = AdorableToken(_tokenAddress);
        require(token.ownerOf(_tokenId) == msg.sender);

        uint256 endOfBiddingTime= block.number + _endOfBidding;
        uint256 endOfRevealingTime= endOfBiddingTime+_endOfRevealing;

        require(token.getApproved(_tokenId) == address(this));
        SealedBidAuction memory sealedBidAuction = SealedBidAuction({
            owner: msg.sender,
            tokenAddress: _tokenAddress,
            tokenId: _tokenId,
            startingPrice:_startingPrice,
            endOfBidding: endOfBiddingTime,
            endOfRevealing: endOfRevealingTime,
            auctionState: State.Started,
            winningBid: 0,
            startedAt:block.number,
            winningBidder: msg.sender,
            bidsCount: 0
            });

        uint256 index = sealedBidAuctions.push(sealedBidAuction) - 1;
        emit AuctionCreated(index, sealedBidAuction.owner, sealedBidAuction.tokenAddress, sealedBidAuction.tokenId);

        return index;

    }
    modifier onlyOwner(uint256 _auctionId){
        require(msg.sender == sealedBidAuctions[_auctionId].owner);
        _;
    }



    modifier notOwner(uint256  _auctionId){
        require(msg.sender != sealedBidAuctions[_auctionId].owner);
        _;
    }

    modifier atState(uint256 _auctionId, State _state) {
        require(sealedBidAuctions[_auctionId].auctionState == _state);
        _;
    }

    function getCurrentTime(uint256 _auctionId) view public returns (uint256){
        return uint256(block.number - sealedBidAuctions[_auctionId].startedAt);
    }

    function bid(uint256 _auctionId, bytes32 hash) public payable atState(_auctionId, State.Started){
        require(msg.value >= sealedBidAuctions[_auctionId].startingPrice);
        sealedBidAuctions[_auctionId].hashedBids[msg.sender] = hash;
        sealedBidAuctions[_auctionId].balances[msg.sender] += msg.value;
        sealedBidAuctions[_auctionId].bidsCount ++;

        emit BidPlaced( hash, sealedBidAuctions[_auctionId].tokenId,_auctionId);
    }

    function startRevealPeriod(uint256 _auctionId) public onlyOwner(_auctionId){
        sealedBidAuctions[_auctionId].auctionState =State.Revealing;
    }

    function getHashForUser(uint256 _auctionId, address _bidder)view  public returns (bytes32){

        return(sealedBidAuctions[_auctionId].hashedBids[_bidder]);
    }

    function getBalanceOf(uint256 _auctionId, address _bidder)view  public returns (uint256){

        return(sealedBidAuctions[_auctionId].balances[_bidder]);
    }

    function getRemainingTime(uint256 _auctionId) public view returns (uint256,uint256){
        return (sealedBidAuctions[_auctionId].endOfBidding - block.number,sealedBidAuctions[_auctionId].endOfRevealing- block.number) ;
    }

    function getHashForUser2 (uint256 amount, uint256 nonce) public view returns ( bytes32){
        return keccak256(abi.encodePacked(amount, nonce));
    }
    function reveal(uint256 _auctionId,uint256 amount, uint256 salt) public atState(_auctionId, State.Revealing){
        require(keccak256(abi.encodePacked(amount, nonce)) ==  sealedBidAuctions[_auctionId].hashedBids[msg.sender]);
        require(amount >= sealedBidAuctions[_auctionId].startingPrice);
        require(amount <= sealedBidAuctions[_auctionId].balances[msg.sender]);

        if (amount > sealedBidAuctions[_auctionId].winningBid) {
            sealedBidAuctions[_auctionId].balances[sealedBidAuctions[_auctionId].owner] -= sealedBidAuctions[_auctionId].winningBid;
            sealedBidAuctions[_auctionId].balances[sealedBidAuctions[_auctionId].winningBidder] += sealedBidAuctions[_auctionId].winningBid;
            sealedBidAuctions[_auctionId].winningBid = amount;
            sealedBidAuctions[_auctionId].winningBidder = msg.sender;
            sealedBidAuctions[_auctionId].balances[sealedBidAuctions[_auctionId].winningBidder] -= sealedBidAuctions[_auctionId].winningBid;
            sealedBidAuctions[_auctionId].balances[sealedBidAuctions[_auctionId].owner] += sealedBidAuctions[_auctionId].winningBid;
        }
        emit HasRevealed( msg.sender, _auctionId);
    }

    function finishRevealPeriod(uint256 _auctionId) public onlyOwner(_auctionId){
        sealedBidAuctions[_auctionId].auctionState =State.Ended;
    }

    function finalizeAuction(uint256 _auctionId) public atState(_auctionId, State.Ended) {
        if (msg.sender == sealedBidAuctions[_auctionId].winningBidder) {
            AdorableToken token = AdorableToken(sealedBidAuctions[_auctionId].tokenAddress);
            token.transferFrom(sealedBidAuctions[_auctionId].owner, sealedBidAuctions[_auctionId].winningBidder, sealedBidAuctions[_auctionId].tokenId);
            token.clearApproval(sealedBidAuctions[_auctionId].winningBidder,sealedBidAuctions[_auctionId].tokenId);

        } else{
            uint256 amount = sealedBidAuctions[_auctionId].balances[msg.sender];
            sealedBidAuctions[_auctionId].balances[msg.sender] = 0;
            msg.sender.transfer(amount);
        }
        emit HasFinalized(msg.sender, _auctionId);
    }


    function cancelAuction(uint256 _auctionId) public onlyOwner(_auctionId) {
        AdorableToken token = AdorableToken(sealedBidAuctions[_auctionId].tokenAddress);
        token.clearApproval(sealedBidAuctions[_auctionId].owner,sealedBidAuctions[_auctionId].tokenId);
        sealedBidAuctions[_auctionId].auctionState = State.Canceled;
    }

    function getTotalAuctions() public view returns (uint256) { return sealedBidAuctions.length; }

}
