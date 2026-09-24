// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NeonflixTicketing {
    address public owner;

    struct Ticket {
        string movieId;
        string showtime;
        string seatId;
        uint256 purchaseTime;
        bool isValid;
    }

    // Mapping dari ID Unik Tiket -> Data Tiket
    mapping(bytes32 => Ticket) public tickets;
    
    // Mapping dari ID Unik Tiket -> Address Pemilik
    mapping(bytes32 => address) public ticketOwner;

    // Event yang akan tercatat secara permanen di blockchain ketika tiket dibeli
    event TicketBooked(bytes32 indexed ticketId, address indexed buyer, string movieId, string seatId);
    event TicketInvalidated(bytes32 indexed ticketId);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Hanya Admin/Owner yang dapat memanggil fungsi ini");
        _;
    }

    /**
     * @dev Fungsi utama untuk membeli/mencatat tiket ke Blockchain
     */
    function bookTicket(
        string memory movieId,
        string memory showtime,
        string memory seatId
    ) public {
        // Membuat ID unik berdasarkan kombinasi film, jadwal, dan nomor kursi
        bytes32 ticketId = keccak256(abi.encodePacked(movieId, showtime, seatId));
        
        // Memastikan kursi ini belum dipesan orang lain (Double-Booking Prevention)
        require(!tickets[ticketId].isValid, "Kursi sudah dipesan untuk jadwal ini!");

        // Mencatat tiket ke dalam blockchain
        tickets[ticketId] = Ticket({
            movieId: movieId,
            showtime: showtime,
            seatId: seatId,
            purchaseTime: block.timestamp,
            isValid: true
        });

        // Menetapkan pembeli sebagai pemilik tiket
        ticketOwner[ticketId] = msg.sender;

        // Memancarkan sinyal ke blockchain bahwa tiket berhasil dibeli
        emit TicketBooked(ticketId, msg.sender, movieId, seatId);
    }

    /**
     * @dev Fungsi untuk mengecek validitas tiket seseorang (digunakan untuk scan tiket masuk)
     */
    function verifyTicket(bytes32 ticketId, address user) public view returns (bool) {
        return tickets[ticketId].isValid && ticketOwner[ticketId] == user;
    }

    /**
     * @dev Fungsi Admin untuk menghanguskan tiket (misalnya tiket sudah di-scan/dipakai)
     */
    function invalidateTicket(bytes32 ticketId) public onlyOwner {
        require(tickets[ticketId].isValid, "Tiket sudah tidak valid/belum dibeli");
        tickets[ticketId].isValid = false;
        emit TicketInvalidated(ticketId);
    }
}
