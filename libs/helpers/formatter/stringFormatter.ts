export function capitalizeEachWord(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatUrlString(input: string): string {
  return input.trim().replace(/\s+/g, "+");
}
