// Utility function to format prices in Indian Rupees
export function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`;
}

// Utility function to format numbers in Indian numbering system
export function formatIndianNumber(number) {
  return number.toLocaleString('en-IN');
}
