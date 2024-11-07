// import { Training } from "../entities/Training";
// import { Webinar } from "../entities/Webinar";
// import { Workshop } from "../entities/Workshop";
// import { eventStatusChecker } from "../helpers/eventStatusChecker";

// interface SearchEventProps {
//   data: Array<Webinar | Training | Workshop>;
//   query: string;
//   filter?: Filter;
//   sort?: Sort;
// }

// export function searchEvent({
//   data,
//   query,
//   filter = Filter.None,
//   sort = Sort.None,
// }: SearchEventProps): Array<Webinar | Training | Workshop> {
//   let filteredData: Array<Webinar | Training | Workshop> = data;

//   if (query) {
//     filteredData = filteredData.filter((event) =>
//       event.title.toLowerCase().includes(query.toLowerCase())
//     );
//   }

//   switch (filter) {
//     case Filter.New:
//       filteredData = filteredData.filter((event) => {
//         const status = eventStatusChecker(event.createdAt, event.startTime);
//         return status.status === "new";
//       });
//       break;
//     case Filter.Past:
//       filteredData = filteredData.filter((event) => {
//         const status = eventStatusChecker(event.createdAt, event.startTime);
//         return status.status === "expired";
//       });
//       break;
//     case Filter.Registered:
//       filteredData = filteredData.filter((event) => event.isRegistered);
//       break;
//     case Filter.Unregistered:
//       filteredData = filteredData.filter((event) => !event.isRegistered);
//       break;
//   }

//   switch (sort) {
//     case Sort.DateDESC:
//       filteredData = filteredData.sort(
//         (a, b) =>
//           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       );
//       break;
//     case Sort.DateASC:
//       filteredData = filteredData.sort(
//         (a, b) =>
//           new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//       );
//       break;
//     case Sort.AlfabeticASC:
//       filteredData = filteredData.sort((a, b) =>
//         a.title.localeCompare(b.title)
//       );
//       break;
//     case Sort.AlfabeticDESC:
//       filteredData = filteredData.sort((a, b) =>
//         b.title.localeCompare(a.title)
//       );
//       break;
//   }

//   return filteredData;
// }

// export enum Sort {
//   None = "None",
//   DateDESC = "Tanggal terbaru",
//   DateASC = "Tanggal terlama",
//   AlfabeticDESC = "Alfabet (Z - A)",
//   AlfabeticASC = "Alfabet (A - Z)",
// }

// export enum Filter {
//   None = "None",
//   New = "Event terbaru",
//   Past = "Event terlewat",
//   Registered = "Sudah daftar",
//   Unregistered = "Belum daftar",
// }
