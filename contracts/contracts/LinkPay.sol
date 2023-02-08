// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LinkPay {
    struct Payment {
        address sender;
        address receiver;
        uint256 amount;
        uint256 timestamp;
        string tokenName;
    }

    struct tokenDetails {
        address tokenAddress;
        string tokenName;
    }

    struct User {
        address userAddress;
        string image;
        string name;
        string bio;
        string twitter;
        uint256 totalReceived;
        uint256 totalSent;
    }

    mapping(string => User) public users;
    mapping(address => string) public addressToUsername;
    mapping(address => Payment[]) public paymentsByAddress;
    mapping(string => tokenDetails[]) public acceptableTokens;

    Payment[] public payments;

    function generateLink(
        string memory _username,
        string memory _image,
        string memory _name,
        string memory _bio,
        string memory _twitter,
        tokenDetails[] memory _tokens
    ) public {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_bio).length > 0, "Bio cannot be empty");
        require(bytes(_twitter).length > 0, "Twitter cannot be empty");
        require(
            bytes(addressToUsername[msg.sender]).length == 0,
            "Address already exists"
        );

        users[_username] = User(
            msg.sender,
            _image,
            _name,
            _bio,
            _twitter,
            0,
            0
        );

        for (uint256 i = 0; i < _tokens.length; i++) {
            acceptableTokens[_username].push(_tokens[i]);
        }

        addressToUsername[msg.sender] = _username;
    }

    function getDetailsByName(string memory _username)
        public
        view
        returns (User memory)
    {
        return users[_username];
    }

    function getDetailsByAddress(address _address)
        public
        view
        returns (User memory)
    {
        return users[addressToUsername[_address]];
    }

    function payToUser(
        string memory _username,
        uint256 _amount,
        address tokenAddress,
        string memory _tokenName
    ) public {
        require(_amount > 0, "Amount cannot be 0");
        User storage user = users[_username];
        require(user.userAddress != address(0), "User does not exist");
        require(user.userAddress != msg.sender, "Cannot send to yourself");

        Payment memory payment = Payment(
            msg.sender,
            user.userAddress,
            _amount,
            block.timestamp,
            _tokenName
        );
        user.totalReceived += _amount;
        users[addressToUsername[msg.sender]].totalSent += _amount;
        paymentsByAddress[msg.sender].push(payment);
        payments.push(payment);

        ERC20 token = ERC20(tokenAddress);
        token.transferFrom(
            msg.sender,
            user.userAddress,
            _amount * (10**token.decimals())
        );
    }
}
