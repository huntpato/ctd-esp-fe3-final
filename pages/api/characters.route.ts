// import type { NextApiRequest, NextApiResponse } from "next";

// import { getCharacter } from "dh-marvel/services/marvel/marvel.service";
// import { ICharacter } from "types/ICharacter.type";

// //type Data = IComicResponse | { error: string; message: string };
// type Data = ICharacter

// export default async function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
//   const { id } = req.query;
//   res.setHeader("Content-Type", "application/json");
//   const idNumber = parseInt(`${id}`);

//   try {
//     const result: ICharacter = await getCharacter(idNumber);
//     res.status(200).json(result);
//     return;
//   } catch (err) {
//     console.log(err);
//   }
// }