const formattedDateTime = (date) => {

    newDate = new Date(date);
    // Extract date components
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(newDate.getDate()).padStart(2, "0");

    // Extract time components
    let hours = newDate.getHours();
    const minutes = String(newDate.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0 becomes 12)

    // Construct formatted date-time string
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;

    return formattedDateTime;
};

function formatDateOnly(isoDateString) {
    const date = new Date(isoDateString);

    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

module.exports = {
    formattedDateTime,
    formatDateOnly
}
