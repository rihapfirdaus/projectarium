export function capitalizeFirstWord(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatUrlString(input: string): string {
  return input.trim().replace(/\s+/g, "+");
}
