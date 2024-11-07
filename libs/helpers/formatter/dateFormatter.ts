export function formatDateTime(dateString: string) {
  const regex =
    /(\d{4})[\/-](\d{2})[\/-](\d{2})[T\s](\d{2}):(\d{2})(?::(\d{2}))?/;

  const match = dateString.match(regex);

  if (!match) {
    throw new Error('Invalid date format. Please use "yyyy-mm-ddTHH:mm:ss".');
  }

  const year = match[1];
  const month = match[2];
  const day = match[3];
  const hours = match[4];
  const minutes = match[5];

  const formattedDate = `${day} ${
    [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ][parseInt(month, 10) - 1]
  } ${year}`;

  const formattedTime = `${hours}:${minutes} WIB`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

export function inputDateFormatter(dateString: string) {
  const regex =
    /(\d{4})[\/-](\d{2})[\/-](\d{2})[T\s](\d{2}):(\d{2})(?::(\d{2}))?/;

  const match = dateString.match(regex);

  if (!match) {
    return dateString;
  }

  const year = match[1];
  const month = match[2];
  const day = match[3];

  return `${year}-${month}-${day}`;
}

export function ISOFormatter(dateString: string) {
  const regex = /(\d{4})[\/-](\d{2})[\/-](\d{2})/;
  const match = dateString.match(regex);

  if (!match) {
    throw new Error(
      'Invalid date format. Please use "yyyy-mm-dd" or "yyyy/mm/dd".'
    );
  }

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const day = parseInt(match[3], 10);

  const date = new Date(year, month, day);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date value.");
  }

  return date.toISOString().split("T")[0];
}
