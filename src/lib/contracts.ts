export const NEONFLIX_TICKETING_ADDRESS = "0xE4f8483fD454b52E98F8797c08Ac1714Bb54ea06";

export const NEONFLIX_TICKETING_ABI = [
  "function bookTicket(string memory movieId, string memory showtime, string memory seatId) public",
  "function verifyTicket(bytes32 ticketId, address user) public view returns (bool)",
  "function tickets(bytes32) public view returns (string movieId, string showtime, string seatId, uint256 purchaseTime, bool isValid)",
  "function ticketOwner(bytes32) public view returns (address)",
  "event TicketBooked(bytes32 indexed ticketId, address indexed buyer, string movieId, string seatId)"
];
