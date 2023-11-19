// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'

type Data = {
  name?: string,
  message?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const ses = getServerSession();
  // Check if the request is authenticated
  const session = await getSession({ req });
  if (!session) {
    // If not authenticated, return an unauthorized response
    res.status(403).json({ message: "This is a protected route, log in to access it." });
    return;
  }

  // If authenticated, proceed with the API logic
  res.status(200).json({ name: 'John Doe' });
}
