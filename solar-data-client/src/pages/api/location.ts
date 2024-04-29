import type { NextApiRequest, NextApiResponse } from "next";
import { axiosServerInstance } from "../../data/common";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {

    try {
        if (req.method === 'POST') {
            const resp = await axiosServerInstance.post('/location', req.body)

            res.status(200).json(resp.data)
        }
        if (req.method === 'GET') {
            const resp = await axiosServerInstance.get('/location')

            res.status(200).json(resp.data)
        }
    } catch (e) {
        //
    }
}
